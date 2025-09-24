"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";

import { DUMMY_REPORT } from "@/app/_constants/dummy-report";
import { db } from "@/app/_lib/prisma";

import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient.users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("Upgrade to premium to use this feature");
  }

  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return DUMMY_REPORT;
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(
          `2025-${(parseInt(month) + 1).toString().padStart(2, "0")}-01`,
        ),
      },
      userId,
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
};
