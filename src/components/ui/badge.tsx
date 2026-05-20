import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-purple/15 text-brand-purple",
        free: "bg-brand-green/15 text-brand-green-neon",
        premium: "bg-brand-purple/15 text-brand-purple",
        paid: "bg-brand-blue/15 text-brand-blue-neon",
        secondary: "bg-surface-2 text-text-secondary",
        destructive: "bg-red-500/15 text-red-400",
        outline: "border border-border text-text-secondary",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
