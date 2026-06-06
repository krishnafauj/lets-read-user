import React from 'react';

interface StatProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

function Stat({ label, value, trend, trendUp }: StatProps) {
  return (
    <div className="flex flex-col border-b-2 border-transparent hover:border-primary pb-2 transition-colors cursor-default">
      <div className="flex items-end gap-2 mb-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {trend && (
          <span className={`text-[10px] font-bold mb-1 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
            {trendUp ? '▲' : '▼'} {trend}
          </span>
        )}
      </div>
      <span className="text-xs text-text-muted capitalize">{label}</span>
    </div>
  );
}

export function BookStats() {
  return (
    <div className="flex flex-wrap items-center gap-10 py-6 border-y border-border">
      <Stat label="Reviews" value="3,985" trend="12%" trendUp={true} />
      <Stat label="Highlights" value="50" trend="4%" trendUp={true} />
      <Stat label="Currently reading" value="26" trend="Live" trendUp={true} />
      <Stat label="Finished" value="5,142" trend="8%" trendUp={true} />
      <Stat label="Want to read" value="961" trend="21%" trendUp={true} />
    </div>
  );
}
