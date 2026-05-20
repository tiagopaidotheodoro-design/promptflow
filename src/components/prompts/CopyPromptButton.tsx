"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";

interface CopyPromptButtonProps {
  text: string;
  promptId: string;
  label?: string;
}

export function CopyPromptButton({ text, promptId, label = "Copiar prompt" }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Prompt copiado!", description: "Cole na ferramenta de IA de sua preferência." });

      // Registra a cópia na API
      fetch("/api/copies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId }),
      }).catch(() => {});

      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({ title: "Erro ao copiar", variant: "destructive" });
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? "secondary" : "default"}
      className="w-full gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-brand-green-neon" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
