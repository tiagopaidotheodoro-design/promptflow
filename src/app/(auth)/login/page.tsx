import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-purple/8 blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-purple shadow-lg shadow-brand-purple/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">
              Prompt<span className="text-brand-purple">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-text-secondary">Entre na sua conta para continuar</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <LoginForm />
        </div>

        <p className="text-center text-sm text-text-muted">
          Não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-brand-purple hover:text-brand-purple/80 transition-colors">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
