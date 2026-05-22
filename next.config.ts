import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Aceita imagens de qualquer domínio HTTPS — conteúdo é gerado pela comunidade.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
