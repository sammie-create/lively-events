import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-2xl px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
      dot: {
        true: "pl-6",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      dot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  const defaultDotColor = "currentColor";
  return (
    // <div className={cn(badgeVariants({ variant }), className)} {...props} />
    <div className={cn(badgeVariants({ variant, dot }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full",
            defaultDotColor
          )}
          style={{ backgroundColor: defaultDotColor }} // ensure dynamic color works
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
