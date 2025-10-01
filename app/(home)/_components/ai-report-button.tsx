"use client";

import { BotIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

import { generateAiReport } from "../_actions/generate-ai-report";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error("Error generating AI report:", error);
    } finally {
      setReportLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full sm:w-auto">
          <span>Relatório IA</span>
          <BotIcon />
        </Button>
      </DialogTrigger>
      {hasPremiumPlan ? (
        <DialogContent className="max-w-[95vw] sm:mx-0 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">
              Relatório gerado por IA
            </DialogTitle>
            <DialogDescription className="text-sm">
              Use a IA para gerar um relatório financeiro detalhado com base nas
              suas transações recentes.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="prose max-h-[300px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white md:max-h-[450px]">
            <Markdown>{report}</Markdown>
          </ScrollArea>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose>
              <Button variant="ghost" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleGenerateReportClick}
              disabled={reportLoading}
              className="w-full sm:w-auto"
            >
              {reportLoading && <Loader2Icon className="animate-spin" />}
              <span className="hidden sm:inline">Gerar relatório</span>
              <span className="sm:hidden">Gerar</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <>
          <DialogContent className="mx-4 max-w-[95vw] sm:mx-0 sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">
                Relatório gerado por IA
              </DialogTitle>
              <DialogDescription className="text-sm">
                Você precisa ser um usuário premium para acessar este recurso.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose>
                <Button variant="ghost" className="w-full sm:w-auto">
                  Cancelar
                </Button>
              </DialogClose>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/subscription">
                  <span className="hidden sm:inline">
                    Assinar plano premium
                  </span>
                  <span className="sm:hidden">Assinar</span>
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AiReportButton;
