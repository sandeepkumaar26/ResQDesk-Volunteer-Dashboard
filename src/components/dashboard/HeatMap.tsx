import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

// Extend Leaflet types for heat layer
declare module 'leaflet' {
  function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: {
      radius?: number;
      blur?: number;
      maxZoom?: number;
      max?: number;
      minOpacity?: number;
      gradient?: { [key: number]: string };
    }
  ): L.Layer;
}

// Distress call data: [latitude, longitude, intensity]
const distressCallPoints: Array<[number, number, number]> = [
  // High density cluster - Downtown Chennai
  [13.0827, 80.2707, 0.9],
  [13.0850, 80.2650, 0.85],
  [13.0800, 80.2720, 0.88],
  [13.0870, 80.2680, 0.82],
  [13.0810, 80.2690, 0.9],
  [13.0840, 80.2710, 0.87],
  [13.0830, 80.2695, 0.92],
  [13.0815, 80.2705, 0.88],
  
  // Medium-high density - T. Nagar
  [13.0418, 80.2339, 0.7],
  [13.0430, 80.2350, 0.65],
  [13.0400, 80.2320, 0.72],
  [13.0410, 80.2360, 0.68],
  [13.0425, 80.2345, 0.71],
  
  // Medium density - Adyar
  [13.0012, 80.2565, 0.5],
  [13.0030, 80.2580, 0.55],
  [13.0000, 80.2550, 0.48],
  [13.0020, 80.2570, 0.52],
  
  // Lower density - Velachery
  [12.9815, 80.2180, 0.35],
  [12.9830, 80.2200, 0.3],
  [12.9820, 80.2190, 0.32],
  
  // Low density - Tambaram
  [12.9249, 80.1270, 0.2],
  [12.9260, 80.1290, 0.15],
  
  // Very low density - outskirts
  [12.8500, 80.0500, 0.1],
  [13.1500, 80.3500, 0.08],
  [12.9000, 80.0800, 0.12],
];

export function HeatMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Initialize map centered on Chennai
    mapInstance.current = L.map(mapContainer.current, {
      center: [13.0827, 80.2707],
      zoom: 11,
      scrollWheelZoom: true,
    });

    // Add OpenStreetMap tiles (free, no API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Add heatmap layer with blue to red gradient
    const heatLayer = L.heatLayer(distressCallPoints, {
      radius: 35,
      blur: 25,
      maxZoom: 15,
      max: 1.0,
      minOpacity: 0.4,
      gradient: {
        0.0: '#0000ff',   // Blue - lowest density
        0.2: '#4169e1',   // Royal blue
        0.4: '#00bfff',   // Deep sky blue
        0.5: '#32cd32',   // Lime green
        0.6: '#ffff00',   // Yellow
        0.7: '#ffd700',   // Gold
        0.8: '#ff8c00',   // Dark orange
        0.9: '#ff4500',   // Orange red
        1.0: '#dc143c',   // Crimson - highest density
      },
    });

    heatLayer.addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

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
        <div className="space-y-4">
          <div 
            ref={mapContainer} 
            className="w-full h-[400px] rounded-lg overflow-hidden border border-border/50 z-0"
          />
          
          {/* Legend */}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Low Density</span>
              <div className="w-32 h-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 via-green-400 via-yellow-400 via-orange-500 to-red-600" />
              <span className="text-xs text-muted-foreground font-medium">High Density</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Real-time distress call distribution
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
