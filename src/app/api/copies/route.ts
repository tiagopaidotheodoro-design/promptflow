import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  const { promptId } = await req.json();

  if (!promptId) return NextResponse.json({ error: "promptId required" }, { status: 400 });

  // Increment counter always
  await prisma.prompt.update({
    where: { id: promptId },
    data: { copiesCount: { increment: 1 } },
  });

  // Log copy if user logged in
  if (session?.user) {
    const userId = (session.user as any).id as string;
    await prisma.promptCopy.upsert({
      where: { id: `${userId}_${promptId}` },
      update: { createdAt: new Date() },
      create: { id: `${userId}_${promptId}`, userId, promptId },
    }).catch(() => {
      // Ignore if upsert fails — just create
      prisma.promptCopy.create({ data: { userId, promptId } }).catch(() => {});
    });
  }

  return NextResponse.json({ ok: true });
}
