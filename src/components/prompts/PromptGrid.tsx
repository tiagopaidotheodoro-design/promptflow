import { PromptCard } from "./PromptCard";
import type { Prompt } from "@/types";
import { cn } from "@/lib/utils";

interface PromptGridProps {
  prompts: Prompt[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function PromptGrid({ prompts, className, columns = 3 }: PromptGridProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Nenhum prompt encontrado</h3>
        <p className="text-sm text-text-secondary">Tente ajustar os filtros ou buscar por outro termo.</p>
      </div>
    );
  }

  return (
    <div className={cn(`grid grid-cols-1 gap-4 ${colClass}`, className)}>
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
