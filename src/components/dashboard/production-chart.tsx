"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: 'Jan', goldOre: 2400, copperOre: 1800, coalExtraction: 3200 },
  { name: 'Feb', goldOre: 2800, copperOre: 2100, coalExtraction: 3600 },
  { name: 'Mar', goldOre: 2200, copperOre: 1900, coalExtraction: 3100 },
  { name: 'Apr', goldOre: 3100, copperOre: 2400, coalExtraction: 3800 },
  { name: 'May', goldOre: 2900, copperOre: 2200, coalExtraction: 3500 },
  { name: 'Jun', goldOre: 3300, copperOre: 2600, coalExtraction: 4000 },
];

export function ProductionChart() {
  return (
    <Card className="bg-gradient-surface shadow-elevation">
      <CardHeader>
        <CardTitle>Production Overview</CardTitle>
        <CardDescription>
          Monthly extraction by material type (tons)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              className="text-muted-foreground"
              fontSize={12}
            />
            <YAxis 
              className="text-muted-foreground"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="goldOre" 
              stroke="hsl(var(--warning))"
              strokeWidth={3}
              name="Gold Ore"
              dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="copperOre" 
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              name="Copper Ore"
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="coalExtraction" 
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Coal"
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}