"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const socials = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
  },
];

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-purple">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                Prompt<span className="text-brand-purple">Flow</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-[200px]">
              {t("footer.description")}
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <p className="mb-3 text-sm font-semibold text-text-primary">Plataforma</p>
            <ul className="space-y-2">
              <li><Link href="/explorar" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Explorar</Link></li>
              <li><Link href="/explorar?tipo=IMAGE" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Categorias</Link></li>
              <li><Link href="/vender" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Criadores</Link></li>
            </ul>
          </div>

          {/* Comunidade */}
          <div>
            <p className="mb-3 text-sm font-semibold text-text-primary">Comunidade</p>
            <ul className="space-y-2">
              <li><Link href="/vender" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Publicar prompt</Link></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Discord</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-3 text-sm font-semibold text-text-primary">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-text-muted hover:text-text-secondary transition-colors">FAQ</Link></li>
              <li><Link href="/legal/termos" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Termos de Uso</Link></li>
              <li><Link href="/legal/privacidade" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Privacidade</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p className="mb-3 text-sm font-semibold text-text-primary">Contato</p>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-muted hover:text-text-primary hover:border-brand-purple/40 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="space-y-1.5">
              <a href="mailto:contato@promptflow.app" className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary transition-colors group">
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-surface-2 group-hover:border-brand-purple/40 transition-colors">✉</span>
                contato@promptflow.app
              </a>
              <a href="mailto:parcerias@promptflow.app" className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary transition-colors group">
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-surface-2 group-hover:border-brand-purple/40 transition-colors">🤝</span>
                parcerias@promptflow.app
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {year} PromptFlow. {t("footer.rights")}
          </p>
          <p className="text-xs text-text-muted">Built with AI ♥</p>
        </div>
      </div>
    </footer>
  );
}
