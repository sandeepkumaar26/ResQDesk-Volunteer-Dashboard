import { heatMapZones, HeatMapZone } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle } from 'lucide-react';

const intensityColors: Record<HeatMapZone['intensity'], { bg: string; border: string; text: string; pulse?: boolean }> = {
  low: { bg: 'bg-success/20', border: 'border-success/40', text: 'text-success' },
  medium: { bg: 'bg-warning/20', border: 'border-warning/40', text: 'text-warning' },
  high: { bg: 'bg-urgent/30', border: 'border-urgent/50', text: 'text-urgent' },
  critical: { bg: 'bg-urgent/40', border: 'border-urgent', text: 'text-urgent', pulse: true },
};

const intensityLabels: Record<HeatMapZone['intensity'], string> = {
  low: 'Low',
  medium: 'Moderate',
  high: 'High',
  critical: 'Critical',
};

export function HeatMap() {
  const sortedZones = [...heatMapZones].sort((a, b) => b.callCount - a.callCount);

  return (
    <Card className="border shadow-md">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-urgent/10">
            <MapPin className="h-5 w-5 text-urgent" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Distress Call Density Map</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Geographic distribution of emergency calls</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Visual Map Representation */}
        <div className="relative bg-gradient-to-br from-secondary/5 to-muted/30 rounded-xl p-6 mb-6 min-h-[280px] border border-border/50">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Zone Bubbles */}
          <div className="relative grid grid-cols-4 gap-4 h-full">
            {sortedZones.map((zone, index) => {
              const styles = intensityColors[zone.intensity];
              const size = zone.intensity === 'critical' ? 'w-20 h-20' : 
                          zone.intensity === 'high' ? 'w-16 h-16' : 
                          zone.intensity === 'medium' ? 'w-14 h-14' : 'w-12 h-12';
              
              return (
                <div 
                  key={zone.id}
                  className="flex items-center justify-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className={`
                      ${size} ${styles.bg} ${styles.border} border-2 rounded-full 
                      flex flex-col items-center justify-center cursor-pointer
                      transition-all duration-300 hover:scale-110 hover:shadow-lg
                      ${styles.pulse ? 'animate-pulse-slow' : ''}
                    `}
                    title={`${zone.name}: ${zone.callCount} calls`}
                  >
                    <span className={`text-xs font-bold ${styles.text}`}>{zone.callCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {(['low', 'medium', 'high', 'critical'] as const).map((intensity) => {
            const styles = intensityColors[intensity];
            return (
              <div key={intensity} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${styles.bg} ${styles.border} border`} />
                <span className="text-xs text-muted-foreground">{intensityLabels[intensity]}</span>
              </div>
            );
          })}
        </div>

        {/* Zone List */}
        <div className="space-y-2">
          {sortedZones.slice(0, 5).map((zone, index) => {
            const styles = intensityColors[zone.intensity];
            return (
              <div 
                key={zone.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  {zone.intensity === 'critical' && (
                    <AlertTriangle className="h-4 w-4 text-urgent animate-pulse" />
                  )}
                  <span className="font-medium text-foreground">{zone.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{zone.callCount} calls</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles.bg} ${styles.text}`}>
                    {intensityLabels[zone.intensity]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
