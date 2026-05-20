"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  promptId: string;
  isFavorited?: boolean;
  className?: string;
}

export function FavoriteButton({ promptId, isFavorited: initial = false, className }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initial);
  const { data: session } = useSession();
  const router = useRouter();

  const toggle = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    const next = !favorited;
    setFavorited(next);
    try {
      await fetch("/api/favorites", {
        method: next ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId }),
      });
      toast({ title: next ? "Adicionado aos favoritos" : "Removido dos favoritos" });
    } catch {
      setFavorited(!next);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={toggle}
      className={cn("gap-2", className)}
    >
      <Heart className={cn("h-4 w-4 transition-colors", favorited && "fill-red-500 text-red-500")} />
      {favorited ? "Favoritado" : "Favoritar"}
    </Button>
  );
}
