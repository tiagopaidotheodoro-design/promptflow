import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Heart, ShoppingBag, Clock, User, LayoutDashboard } from "lucide-react";

const sideLinks = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/favoritos", label: "Favoritos", icon: Heart },
  { href: "/dashboard/compras", label: "Compras", icon: ShoppingBag },
  { href: "/dashboard/conta", label: "Minha conta", icon: User },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0">
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

          {/* Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
