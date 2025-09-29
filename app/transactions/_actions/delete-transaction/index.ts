"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

import { DeleteTransactionSchema, deleteTransactionSchema } from "./schema";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  deleteTransactionSchema.parse({ transactionId });

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  await db.transaction.delete({
    where: { id: transactionId },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
};
