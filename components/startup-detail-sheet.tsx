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
import { Separator } from "@/components/ui/separator"
import { type StartupResult } from "@/lib/mock-data"
import {
  Building2,
  DollarSign,
  Flame,
  MapPin,
  Rocket,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

interface StartupDetailSheetProps {
  startup: StartupResult | null
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

export function StartupDetailSheet({
  startup,
  open,
  onOpenChange,
}: StartupDetailSheetProps) {
  if (!startup) return null

  const isHighGrowth = startup.growthPotential === "High"

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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-serif text-sm font-bold text-primary">
              {startup.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="truncate font-serif text-lg font-bold text-foreground">
                {startup.name}
              </SheetTitle>
              <SheetDescription className="mt-0.5 font-mono text-xs text-muted-foreground">
                {startup.id}
              </SheetDescription>
              {/* Classification badges */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">
                  {startup.sector}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {startup.stage}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {startup.businessModel}
                </Badge>
                <Badge
                  className={`text-xs font-semibold ${
                    isHighGrowth
                      ? "bg-accent/15 text-accent hover:bg-accent/15"
                      : "bg-destructive/15 text-destructive hover:bg-destructive/15"
                  }`}
                >
                  {startup.growthPotential} Growth
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
          {/* Scores */}
          <SectionLabel>Rule-Based Scores</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Growth Score</span>
              <span className="font-semibold text-foreground">
                {startup.growthScore} / 100
              </span>
            </div>
            <Progress value={startup.growthScore} className="h-1.5 mb-4" />

            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Match Score</span>
              <span className="font-semibold text-primary">
                {startup.matchScore} / 100
              </span>
            </div>
            <Progress value={startup.matchScore} className="h-1.5" />

            <p className="mt-3 text-xs text-muted-foreground">
              Scores are computed by a rule-based formula, not a trained ML model.
            </p>
          </div>

          {/* Location */}
          <SectionLabel>Location</SectionLabel>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {startup.location}
            </span>
          </div>

          {/* Financials */}
          <SectionLabel>Financials</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border">
            <div className="px-4">
              <MetricRow
                icon={DollarSign}
                label="Funding Needed"
                value={startup.fundingNeeded}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={DollarSign}
                label="Funding Raised"
                value={startup.fundingRaised}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={TrendingUp}
                label="Valuation"
                value={startup.valuation}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={DollarSign}
                label="Revenue"
                value={startup.revenue}
              />
            </div>
          </div>

          {/* Operations */}
          <SectionLabel>Operations</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border">
            <div className="px-4">
              <MetricRow
                icon={TrendingUp}
                label="Growth Rate"
                value={`+${startup.growthRate}%`}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={Users}
                label="Team Size"
                value={`${startup.teamSize} people`}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={Users}
                label="User Count"
                value={startup.userCount.toLocaleString()}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={Zap}
                label="Traction Score"
                value={`${startup.tractionScore} / 100`}
              />
            </div>
          </div>

          {/* Burn & Runway */}
          <SectionLabel>Burn & Runway</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border">
            <div className="px-4">
              <MetricRow
                icon={Flame}
                label="Monthly Burn Rate"
                value={`$${startup.burnRate.toLocaleString()}`}
              />
            </div>
            <div className="px-4">
              <MetricRow
                icon={Timer}
                label="Runway"
                value={`${startup.runwayMonths} months`}
              />
            </div>
          </div>

          {/* Classification */}
          <SectionLabel>Classification</SectionLabel>
          <div className="rounded-xl border border-border bg-card/60 divide-y divide-border">
            <div className="px-4">
              <MetricRow icon={Rocket} label="Stage" value={startup.stage} />
            </div>
            <div className="px-4">
              <MetricRow
                icon={Building2}
                label="Business Model"
                value={startup.businessModel}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
