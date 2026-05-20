"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-purple text-white shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-brand-purple/20",
        secondary:
          "border border-border bg-surface text-text-primary hover:border-brand-purple/50 hover:bg-surface-2",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-surface-2",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-brand-purple/50 bg-transparent text-brand-purple hover:bg-brand-purple/10",
        link: "text-brand-purple underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-brand text-white shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-brand-purple/20",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
