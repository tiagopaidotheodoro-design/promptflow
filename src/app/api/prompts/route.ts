import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  if (user.role !== "CREATOR" && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Apenas criadores podem cadastrar prompts." }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, type, recommendedTool, promptPt, promptEn, negativePrompt,
    instructions, aspectRatio, price, isFree, isPremium, previewImage, tags } = body;

  if (!title || !description || !promptPt) {
    return NextResponse.json({ error: "Campos obrigatórios: título, descrição e prompt PT." }, { status: 400 });
  }

  // Buscar categoria padrão se não informada
  let categoryId = body.categoryId;
  if (!categoryId) {
    const defaultCat = await prisma.category.findFirst();
    categoryId = defaultCat?.id;
  }

  // Gerar slug único
  let slug = slugify(title);
  const exists = await prisma.prompt.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now()}`;

  const prompt = await prisma.prompt.create({
    data: {
      title, slug, description, type, categoryId, creatorId: user.id,
      promptPt, promptEn: promptEn || null, negativePrompt: negativePrompt || null,
      instructions: instructions || null, recommendedTool, aspectRatio: aspectRatio || "1:1",
      price: price || 0, isFree: !!isFree, isPremium: !!isPremium,
      previewImage: previewImage || null, tags: tags || [],
      status: "PENDING",
    },
  });

  return NextResponse.json({ ok: true, prompt });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;
  const body = await req.json();
  const { id, ...data } = body;

  const prompt = await prisma.prompt.findUnique({ where: { id } });
  if (!prompt) return NextResponse.json({ error: "Prompt não encontrado." }, { status: 404 });

  if (prompt.creatorId !== user.id && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  const updated = await prisma.prompt.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      recommendedTool: data.recommendedTool,
      promptPt: data.promptPt,
      promptEn: data.promptEn || null,
      negativePrompt: data.negativePrompt || null,
      instructions: data.instructions || null,
      aspectRatio: data.aspectRatio,
      price: data.price || 0,
      isFree: !!data.isFree,
      isPremium: !!data.isPremium,
      previewImage: data.previewImage || null,
      tags: data.tags || [],
      status: user.role === "ADMIN" ? data.status : "PENDING",
    },
  });

  return NextResponse.json({ ok: true, prompt: updated });
}
