import type * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface PayloadItem {
  name?: string;
  value: number;
}

interface ChartTooltipContentProps {
  label?: string;
  valueFormatter?: (value: number) => string;
  payload?: PayloadItem[];
}

function ChartTooltipContent({
  label,
  valueFormatter = (value) => value.toLocaleString(),
  payload,
}: ChartTooltipContentProps) {
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-sm">
      {label ? <div className="text-sm font-medium capitalize">{label}</div> : null}
      <ul className="mt-2 space-y-1">
        {payload.map((item, index) => (
          <li key={index} className="flex items-center justify-between text-xs">
            <span className="mr-2">{item.name || "Value"}:</span>
            <span>{valueFormatter(item.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ChartTooltipProps {
  content: React.ReactNode;
}

function ChartTooltip({ content }: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{content}</div>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ChartContainerProps {
  children: React.ReactNode;
}

export function ChartContainer({ children }: ChartContainerProps) {
  return <Chart>{children}</Chart>;
}

interface ChartProps {
  children: React.ReactNode;
}

export function Chart({ children }: ChartProps) {
  return <>{children}</>;
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, ChartTooltipContent, ChartTooltip };