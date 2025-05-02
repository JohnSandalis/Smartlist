import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-[fit-content] rounded-md px-3.5 py-2.5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong whitespace-nowrap font-semibold text-white ring-offset-white disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 hover:ease-linear",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary-light",
        white: "bg-white text-black focus-visible:outline-white",
        text: "font-button-text text-button-text text-black bg-transparent",
        destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        ghost: "",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const classes = `${buttonVariants({ variant })} ${className ?? ""}`;

    return (
      <button className={classes} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
