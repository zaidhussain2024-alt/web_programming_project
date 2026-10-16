"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type InvestorMatch } from "@/lib/mock-data"
import {
  Building2,
  DollarSign,
  TrendingUp,
  Info,
  Briefcase,
} from "lucide-react"

interface InvestorDetailSheetProps {
  investor: InvestorMatch | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function MetricRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  )
}

export function InvestorDetailSheet({
  investor,
  open,
  onOpenChange,
}: InvestorDetailSheetProps) {
  if (!investor) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto border-border bg-background p-0 sm:max-w-md"
      >
        {/* Header */}
        <SheetHeader className="border-b border-border px-6 py-5">
          <div className="flex items-start gap-4 pr-6">
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
              {investor.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="truncate font-serif text-lg font-bold text-foreground">
                {investor.name}
              </SheetTitle>
              <SheetDescription className="mt-0.5 text-xs text-muted-foreground">
                {investor.firm} • Investor #{investor.id}
              </SheetDescription>
              {/* Classification badges */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">
                  {investor.sector}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {investor.preferredStage}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {investor.investmentRange}
                </Badge>
              </div>
            </div>
          </div>

          {/* Prototype data notice */}
          <p className="mt-3 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            ⚠ Synthetic prototype data — illustrative only
          </p>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {/* Rule-Based Compatibility Score */}
          <SectionLabel>Rule-Based Compatibility</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Compatibility Match</span>
              <span className="font-semibold text-primary">
                {investor.matchScore} / 100
              </span>
            </div>
            <Progress value={investor.matchScore} className="h-1.5 mb-3" />
            <div className="flex items-start gap-2 rounded-md bg-muted/50 p-2.5 text-xs text-muted-foreground">
              <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>
                <strong>Rule-based compatibility:</strong> This score is calculated via heuristic matching criteria (sector fit, stage fit, and growth traction). It is <strong>not</strong> a trained machine learning prediction.
              </span>
            </div>
          </div>

          {/* Investment Criteria */}
          <SectionLabel>Investment Criteria</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border">
            <div className="px-4">
              <MetricRow
                icon={Briefcase}
                label="Venture Firm"
                value={investor.firm}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={Building2}
                label="Sector Focus"
                value={investor.sector}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={TrendingUp}
                label="Preferred Stage"
                value={investor.preferredStage}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={DollarSign}
                label="Investment Range"
                value={investor.investmentRange}
              />
            </div>
          </div>

          {/* Matching Factors Explanation */}
          <SectionLabel>Matching Factors & Formula</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border text-xs">
            <div className="p-3.5">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span>Base Compatibility</span>
                <Badge variant="outline" className="font-mono text-[11px]">+50 pts</Badge>
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Baseline starting compatibility score assigned to all active candidate investors in the matching pool.
              </p>
            </div>

            <div className="p-3.5">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span>Sector Alignment</span>
                <Badge variant="outline" className="font-mono text-[11px]">+25 pts</Badge>
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Awarded when the submitted startup sector matches one of the investor&apos;s focused industry sectors ({investor.sector}).
              </p>
            </div>

            <div className="p-3.5">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span>Stage Alignment</span>
                <Badge variant="outline" className="font-mono text-[11px]">+15 pts</Badge>
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Awarded when the submitted startup funding stage matches one of the investor&apos;s active portfolio stages ({investor.preferredStage}).
              </p>
            </div>

            <div className="p-3.5">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span>Growth Momentum Bonus</span>
                <Badge variant="outline" className="font-mono text-[11px]">0 to +10 pts</Badge>
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Calculated dynamically as +1 point for every 30% of annual growth rate: <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">min(10, floor(growthRate / 30))</code>.
              </p>
            </div>

            <div className="p-3.5">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span>Market Jitter & Score Cap</span>
                <Badge variant="outline" className="font-mono text-[11px]">Max 99%</Badge>
              </div>
              <p className="mt-1 text-muted-foreground leading-relaxed">
                Adds a small variance of +0 to +4 points, with total match compatibility capped at a maximum of 99% (<code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">min(99, score)</code>).
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
