import { redirect } from "next/navigation";

// Página de ganhos removida — PromptFlow é totalmente gratuito durante o beta.
export default function GanhosPage() {
  redirect("/creator");
}
