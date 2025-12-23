import { distressCallData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Phone, TrendingUp } from 'lucide-react';

export function DistressCallChart() {
  return (
    <Card className="border shadow-md">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Distress Call Analytics</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Daily registrations vs volunteer response rate</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distressCallData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="registrations" 
                name="Distress Registrations"
                fill="hsl(var(--urgent))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="volunteersAttending" 
                name="Volunteers Attending"
                fill="hsl(var(--success))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-success" />
          <span>87% average response rate over the past week</span>
        </div>
      </CardContent>
    </Card>
  );
}
