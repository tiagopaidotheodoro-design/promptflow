import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, FileText } from "lucide-react";

const sideLinks = [
  { href: "/creator", label: "Visão geral", icon: LayoutDashboard },
  { href: "/creator/prompts", label: "Meus prompts", icon: FileText },
  { href: "/creator/prompts/novo", label: "Novo prompt", icon: PlusCircle },
];

export default async function CreatorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="w-full md:w-56 shrink-0">
            <div className="mb-3 rounded-xl border border-brand-purple/30 bg-brand-purple/10 px-3 py-2 text-xs font-semibold text-brand-purple">
              ✦ Área do Criador
            </div>
            <nav className="rounded-2xl border border-border bg-surface p-2 space-y-0.5">
              {sideLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
