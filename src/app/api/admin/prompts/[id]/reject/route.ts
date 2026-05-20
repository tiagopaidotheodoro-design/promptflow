import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const user = session?.user as any;
  if (!session || user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.prompt.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  return NextResponse.redirect(new URL("/admin/prompts", process.env.NEXTAUTH_URL ?? "http://localhost:3000"));
}
