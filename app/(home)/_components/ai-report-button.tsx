"use client";

import { BotIcon, Loader2Icon } from "lucide-react";
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
  month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
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
        <Button variant="ghost">
          Relatório IA <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Relatório gerado por IA</DialogTitle>
          <DialogDescription>
            Use a IA para gerar um relatório financeiro detalhado com base nas
            suas transações recentes.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReportClick} disabled={reportLoading}>
            {reportLoading && <Loader2Icon className="animate-spin" />}
            Gerar relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
