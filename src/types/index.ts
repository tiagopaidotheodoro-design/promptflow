export type Role = "USER" | "CREATOR" | "ADMIN";
export type Plan = "FREE" | "PRO" | "CREATOR";
export type PromptType = "IMAGE" | "VIDEO" | "TEXT" | "PACK";
export type PromptStatus = "PENDING" | "APPROVED" | "REJECTED";
export type PurchaseStatus = "PENDING" | "COMPLETED" | "REFUNDED";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  plan: Plan;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  bio: string | null;
  avatar: string | null;
  totalSales: number;
  totalPrompts: number;
  rating: number;
  user?: Pick<User, "id" | "name" | "image">;
}

export interface Prompt {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: PromptType;
  categoryId: string;
  creatorId: string;
  promptPt: string;
  promptEn: string | null;
  negativePrompt: string | null;
  instructions: string | null;
  recommendedTool: string;
  aspectRatio: string | null;
  tags: string[];
  price: number;
  isFree: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  status: PromptStatus;
  previewImage: string | null;
  previewVideo: string | null;
  copiesCount: number;
  favoritesCount: number;
  salesCount: number;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  creator?: Pick<User, "id" | "name" | "image">;
  _count?: { favorites: number; reviews: number };
}

export interface Review {
  id: string;
  userId: string;
  promptId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user?: Pick<User, "id" | "name" | "image">;
}

export interface FilterState {
  type: string;
  tool: string;
  use: string;
  price: string;
  sort: string;
  search: string;
}

export const TOOLS = [
  "ChatGPT",
  "ChatGPT Image",
  "Gemini",
  "Midjourney",
  "Sora",
  "Veo",
  "Runway",
  "Kling",
  "Pika",
] as const;

export const PROMPT_TYPES = [
  { value: "IMAGE", label: "Imagem", emoji: "🖼️" },
  { value: "VIDEO", label: "Vídeo", emoji: "🎬" },
  { value: "TEXT", label: "Texto", emoji: "📝" },
  { value: "PACK", label: "Pack", emoji: "📦" },
] as const;

export const PLANS = {
  FREE: {
    name: "Grátis",
    price: 0,
    color: "text-text-secondary",
    features: [
      "Acesso a prompts gratuitos",
      "Favoritar prompts",
      "Ver prévias premium",
      "3 cópias por dia",
    ],
  },
  PRO: {
    name: "Pro",
    price: 29.9,
    color: "text-brand-blue-neon",
    features: [
      "50 prompts premium por mês",
      "Packs selecionados",
      "Favoritos ilimitados",
      "Histórico de prompts",
    ],
  },
  CREATOR: {
    name: "Creator",
    price: 59.9,
    color: "text-brand-purple",
    features: [
      "Acesso ilimitado aos prompts",
      "Todos os packs premium",
      "Variações de prompts",
      "Área para vender prompts",
      "Estatísticas avançadas",
    ],
  },
} as const;
