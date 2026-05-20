"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";
import { TOOLS } from "@/lib/constants";

const TYPES = ["IMAGE", "VIDEO", "TEXT", "PACK"];
const ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:5", "2:3", "3:2", "Livre"];

// tags pode vir como array ou como string JSON ('["a","b"]') — normaliza para CSV
function tagsToInput(tags: unknown): string {
  if (Array.isArray(tags)) return tags.join(", ");
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed.join(", ") : tags;
    } catch {
      return tags;
    }
  }
  return "";
}

export function NewPromptForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    type: initialData?.type ?? "IMAGE",
    recommendedTool: initialData?.recommendedTool ?? "ChatGPT",
    promptPt: initialData?.promptPt ?? "",
    promptEn: initialData?.promptEn ?? "",
    negativePrompt: initialData?.negativePrompt ?? "",
    instructions: initialData?.instructions ?? "",
    aspectRatio: initialData?.aspectRatio ?? "1:1",
    price: initialData?.price?.toString() ?? "0",
    isFree: initialData?.isFree ?? true,
    isPremium: initialData?.isPremium ?? false,
    previewImage: initialData?.previewImage ?? "",
    tags: tagsToInput(initialData?.tags),
    categorySlug: initialData?.categorySlug ?? "",
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/prompts", {
      method: initialData ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: 0,
        isFree: true,
        isPremium: false,
        tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        id: initialData?.id,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast({ title: "Erro", description: data.error, variant: "destructive" });
      return;
    }

    toast({ title: initialData ? "Prompt atualizado!" : "Prompt enviado para revisão!" });
    router.push("/creator/prompts");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Título *</label>
          <Input placeholder="Ex: Vídeo POV Cinematográfico para Reels" value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Descrição *</label>
          <textarea
            className="input-base min-h-[80px] resize-y"
            placeholder="Descreva o que este prompt cria..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-text-secondary">Tipo *</label>
          <select className="input-base" value={form.type} onChange={(e) => set("type", e.target.value)}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-text-secondary">Ferramenta recomendada *</label>
          <select className="input-base" value={form.recommendedTool} onChange={(e) => set("recommendedTool", e.target.value)}>
            {TOOLS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Prompt em Português *</label>
          <textarea className="input-base min-h-[120px] font-mono text-xs resize-y" placeholder="Escreva o prompt completo em português..." value={form.promptPt} onChange={(e) => set("promptPt", e.target.value)} required />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Prompt em Inglês (opcional)</label>
          <textarea className="input-base min-h-[120px] font-mono text-xs resize-y" placeholder="Versão em inglês do prompt..." value={form.promptEn} onChange={(e) => set("promptEn", e.target.value)} />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Prompt negativo (opcional)</label>
          <textarea className="input-base min-h-[70px] font-mono text-xs resize-y" placeholder="Elementos a evitar no resultado..." value={form.negativePrompt} onChange={(e) => set("negativePrompt", e.target.value)} />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Instruções de uso</label>
          <textarea className="input-base min-h-[70px] resize-y" placeholder="Como usar este prompt, configurações recomendadas..." value={form.instructions} onChange={(e) => set("instructions", e.target.value)} />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-text-secondary">Proporção (aspect ratio)</label>
          <select className="input-base" value={form.aspectRatio} onChange={(e) => set("aspectRatio", e.target.value)}>
            {ASPECT_RATIOS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-text-secondary">URL da imagem de preview</label>
          <Input placeholder="https://..." value={form.previewImage} onChange={(e) => set("previewImage", e.target.value)} />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-medium text-text-secondary">Tags (separadas por vírgula)</label>
          <Input placeholder="retrato, anime, viral, tiktok" value={form.tags} onChange={(e) => set("tags", e.target.value)} />
        </div>
      </div>

      <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 px-4 py-3 text-xs text-text-secondary">
        ✓ Todos os prompts publicados no PromptFlow são gratuitos para a comunidade.
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1 sm:flex-none sm:w-48" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : initialData ? "Salvar alterações" : "Enviar para revisão"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
