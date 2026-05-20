import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// Normaliza tags para string JSON (o banco armazena como String)
function tagsToString(tags: unknown): string {
  if (Array.isArray(tags)) return JSON.stringify(tags);
  if (typeof tags === "string") {
    // já é string — se for JSON válido mantém, senão trata como CSV
    try {
      JSON.parse(tags);
      return tags;
    } catch {
      return JSON.stringify(tags.split(",").map((t) => t.trim()).filter(Boolean));
    }
  }
  return "[]";
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = session.user as any;

  const body = await req.json();
  const { title, description, type, recommendedTool, promptPt, promptEn, negativePrompt,
    instructions, aspectRatio, previewImage, tags } = body;

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
      price: 0, isFree: true, isPremium: false,
      previewImage: previewImage || null, tags: tagsToString(tags),
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
      price: 0,
      isFree: true,
      isPremium: false,
      previewImage: data.previewImage || null,
      tags: tagsToString(data.tags),
      status: user.role === "ADMIN" ? data.status : "PENDING",
    },
  });

  return NextResponse.json({ ok: true, prompt: updated });
}
