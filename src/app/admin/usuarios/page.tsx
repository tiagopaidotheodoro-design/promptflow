import { prisma } from "@/lib/prisma";
import { planLabel, roleLabel } from "@/lib/utils";

export default async function AdminUsuariosPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, plan: true, createdAt: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Usuários ({users.length})</h1>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Nome</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Papel</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Plano</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3 font-medium text-text-primary">{u.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${u.role === "ADMIN" ? "text-red-400" : u.role === "CREATOR" ? "text-brand-purple" : "text-text-muted"}`}>
                      {roleLabel(u.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{planLabel(u.plan)}</td>
                  <td className="px-4 py-3 text-text-muted text-xs">
                    {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
