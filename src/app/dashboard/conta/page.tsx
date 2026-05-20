import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function ContaPage() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Minha Conta</h1>

      <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img src={user.image} className="h-16 w-16 rounded-full object-cover border border-border" alt="" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-purple text-2xl font-bold text-white">
              {user?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-text-primary">{user?.name}</p>
            <p className="text-sm text-text-secondary">{user?.email}</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Link href="/creator/prompts/novo">
            <Button size="sm" variant="gradient">
              <PlusCircle className="h-4 w-4" /> Publicar um prompt
            </Button>
          </Link>
          <Link href="/creator/prompts">
            <Button size="sm" variant="secondary">Meus prompts</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
