"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  Zap, Menu, X, ChevronDown, User, LogOut,
  LayoutDashboard, PenSquare, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/contexts/LanguageContext";

export function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const t = useT();

  const user = session?.user as any;

  const dashLink =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "CREATOR"
      ? "/creator"
      : "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-purple shadow-lg shadow-brand-purple/30 group-hover:scale-105 transition-transform">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Prompt<span className="text-brand-purple">Flow</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-surface-2",
                link.label === "Publicar" && "text-brand-purple hover:text-brand-purple"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {!session ? (
            <>
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm">{t("nav.login")}</Button>
              </Link>
              <Link href="/cadastro">
                <Button size="sm">{t("nav.register")}</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-primary hover:border-brand-purple/50 transition-colors"
              >
                {user?.image ? (
                  <img src={user.image} className="h-6 w-6 rounded-full object-cover" alt="" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-purple text-xs font-bold text-white">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}
                <span className="hidden sm:inline max-w-[100px] truncate">{user?.name}</span>
                <ChevronDown className="h-3 w-3 text-text-muted" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-border bg-surface-2 p-1.5 shadow-xl">
                    <Link
                      href={dashLink}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {t("nav.dashboard")}
                    </Link>
                    <Link
                      href="/creator"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                    >
                      <PenSquare className="h-4 w-4" />
                      {t("nav.creatorPanel")}
                    </Link>
                    {user?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        {t("nav.adminPanel")}
                      </Link>
                    )}
                    <div className="my-1 h-px bg-border" />
                    <button
                      onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("nav.signOut")}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col py-3 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2 px-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {!session && (
              <div className="mt-2 flex gap-2">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" className="w-full" size="sm">{t("nav.login")}</Button>
                </Link>
                <Link href="/cadastro" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm">{t("nav.register")}</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
