import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const { promptId } = await req.json();

  const existing = await prisma.favorite.findUnique({
    where: { userId_promptId: { userId, promptId } },
  });

  if (existing) return NextResponse.json({ ok: true, favorited: true });

  await prisma.$transaction([
    prisma.favorite.create({ data: { userId, promptId } }),
    prisma.prompt.update({ where: { id: promptId }, data: { favoritesCount: { increment: 1 } } }),
  ]);

  return NextResponse.json({ ok: true, favorited: true });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;
  const { promptId } = await req.json();

  await prisma.$transaction([
    prisma.favorite.deleteMany({ where: { userId, promptId } }),
    prisma.prompt.update({ where: { id: promptId }, data: { favoritesCount: { decrement: 1 } } }),
  ]);

  return NextResponse.json({ ok: true, favorited: false });
}
