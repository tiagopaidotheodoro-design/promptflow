import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price === 0) return "Grátis";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function promptTypeLabel(type: string): string {
  const map: Record<string, string> = {
    IMAGE: "Imagem",
    VIDEO: "Vídeo",
    TEXT: "Texto",
    PACK: "Pack",
  };
  return map[type] ?? type;
}

export function promptTypeEmoji(type: string): string {
  const map: Record<string, string> = {
    IMAGE: "🖼️",
    VIDEO: "🎬",
    TEXT: "📝",
    PACK: "📦",
  };
  return map[type] ?? "📝";
}

export function roleLabel(role: string): string {
  const map: Record<string, string> = {
    USER: "Usuário",
    CREATOR: "Criador",
    ADMIN: "Admin",
  };
  return map[role] ?? role;
}

export function planLabel(plan: string): string {
  const map: Record<string, string> = {
    FREE: "Grátis",
    PRO: "Pro",
    CREATOR: "Creator",
  };
  return map[plan] ?? plan;
}
