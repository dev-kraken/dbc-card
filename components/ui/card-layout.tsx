import * as React from "react";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const CardPageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full grid grid-cols-1 md:grid-cols-3", className)}
    {...props}
  />
));
CardPageLayout.displayName = "CardPageLayout";

const CardPageMain: React.FC<PropsWithChildren<{}>> = ({
  children,
  ...props
}) => <React.Fragment {...props}>{children}</React.Fragment>;

CardPageMain.displayName = "CardPageMain";

const CardPageLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, title, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-b border-slate-900/10 col-span-3 py-4 px-4 flex items-center justify-between",
      className,
    )}
    {...props}
  >
    {title && <CardPageLayoutTitle>{title}</CardPageLayoutTitle>}
    {children}
  </div>
));
CardPageLayoutHeader.displayName = "CardPageLayoutHeader";

const CardPageLayoutTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold", className)}
    {...props}
  />
));
CardPageLayoutTitle.displayName = "CardPageLayoutTitle";

const CardPageLayoutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("col-span-2 p-4", className)} {...props} />
));
CardPageLayoutContent.displayName = "CardPageLayoutContent";

export {
  CardPageLayout,
  CardPageMain,
  CardPageLayoutHeader,
  CardPageLayoutTitle,
  CardPageLayoutContent,
};
