import * as React from "react";

import { cn } from "@/lib/utils";

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
));
PageLayout.displayName = "PageLayout";

const PageLayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, title, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-b border-slate-900/10 py-4 px-4 flex items-center justify-between",
      className,
    )}
    {...props}
  >
    {title && <PageLayoutTitle>{title}</PageLayoutTitle>}
    {children}
  </div>
));
PageLayoutHeader.displayName = "PageLayoutHeader";

const PageLayoutTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold", className)}
    {...props}
  />
));
PageLayoutTitle.displayName = "PageLayoutTitle";

const PageLayoutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
));
PageLayoutContent.displayName = "PageLayoutContent";

export { PageLayout, PageLayoutHeader, PageLayoutTitle, PageLayoutContent };
