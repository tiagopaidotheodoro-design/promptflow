export const SITE_NAME = "PromptFlow";
export const SITE_DESCRIPTION =
  "The global community of AI prompts for image, video and text. Midjourney, DALL·E, Sora, ChatGPT, Gemini and much more.";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/explorar", label: "Explorar" },
  { href: "/categorias/imagens-realistas", label: "Imagens" },
  { href: "/categorias/videos-virais", label: "Vídeos" },
  { href: "/packs", label: "Packs" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/vender", label: "Publicar" },
] as const;

export const QUICK_FILTERS = [
  { label: "🎬 Vídeo viral", value: "video-viral" },
  { label: "👤 Imagem de perfil", value: "imagem-perfil" },
  { label: "🖼️ Thumbnail YouTube", value: "thumbnail-youtube" },
  { label: "🛒 Anúncio de produto", value: "anuncio-produto" },
  { label: "🎮 Anime wallpaper", value: "anime-wallpaper" },
  { label: "📹 Vídeo POV", value: "video-pov" },
  { label: "📱 Post Instagram", value: "post-instagram" },
  { label: "✍️ Logo", value: "logo" },
  { label: "📦 Pack completo", value: "pack" },
] as const;

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

export const SORT_OPTIONS = [
  { value: "copies", label: "Mais copiados" },
  { value: "favorites", label: "Mais curtidos" },
  { value: "newest", label: "Mais novos" },
  { value: "sales", label: "Mais vendidos" },
] as const;

export const PRICE_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "free", label: "Grátis" },
  { value: "premium", label: "Premium" },
  { value: "paid", label: "Avulso" },
] as const;
