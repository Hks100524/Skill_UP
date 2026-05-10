import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetTitle = Dialog.Title;

function SheetPortal({ children }: { children: React.ReactNode }) {
  return <Dialog.Portal>{children}</Dialog.Portal>;
}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm", className)}
    {...props}
  />
));

SheetOverlay.displayName = Dialog.Overlay.displayName;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: "right" | "left";
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, children, side = "right", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed z-50 h-full bg-background p-6 shadow-xl transition-all duration-300 focus:outline-none",
        side === "right" ? "inset-y-0 right-0 border-l border-border w-[280px] sm:w-[350px]" : "inset-y-0 left-0 border-r border-border w-[280px] sm:w-[350px]",
        className,
      )}
      {...props}
    >
      {children}
      <SheetClose className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </Dialog.Content>
  </SheetPortal>
));

SheetContent.displayName = Dialog.Content.displayName;

export { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger };
