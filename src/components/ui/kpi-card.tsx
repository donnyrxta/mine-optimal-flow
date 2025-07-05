import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  className
}: KPICardProps) {
  const isPositiveChange = change && change > 0;
  const isNegativeChange = change && change < 0;

  return (
    <Card className={cn(
      "bg-gradient-surface shadow-elevation hover:shadow-glow transition-all duration-300",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-5 w-5",
          variant === "success" && "text-success",
          variant === "warning" && "text-warning",
          variant === "danger" && "text-destructive",
          variant === "default" && "text-primary"
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
        </div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground mt-2">
            <span className={cn(
              "font-medium",
              isPositiveChange && "text-success",
              isNegativeChange && "text-destructive"
            )}>
              {isPositiveChange && "+"}
              {change}%
            </span>
            {changeLabel && ` ${changeLabel}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}