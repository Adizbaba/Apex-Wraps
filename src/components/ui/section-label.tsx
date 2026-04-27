import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-4", className)} {...props}>
      <div className="h-0.5 w-8 bg-orange" />
      <span className="text-orange text-[10px] font-bold tracking-[0.3em] uppercase font-headline">
        {children}
      </span>
    </div>
  )
}
