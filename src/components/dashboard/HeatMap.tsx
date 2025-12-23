import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle } from "lucide-react";

// Sample distress call locations with varying intensities
const distressCallData = {
  type: 'FeatureCollection' as const,
  features: [
    // High density cluster - Downtown Chennai
    { type: 'Feature' as const, properties: { intensity: 0.9 }, geometry: { type: 'Point' as const, coordinates: [80.2707, 13.0827] } },
    { type: 'Feature' as const, properties: { intensity: 0.85 }, geometry: { type: 'Point' as const, coordinates: [80.2650, 13.0850] } },
    { type: 'Feature' as const, properties: { intensity: 0.88 }, geometry: { type: 'Point' as const, coordinates: [80.2720, 13.0800] } },
    { type: 'Feature' as const, properties: { intensity: 0.82 }, geometry: { type: 'Point' as const, coordinates: [80.2680, 13.0870] } },
    { type: 'Feature' as const, properties: { intensity: 0.9 }, geometry: { type: 'Point' as const, coordinates: [80.2690, 13.0810] } },
    { type: 'Feature' as const, properties: { intensity: 0.87 }, geometry: { type: 'Point' as const, coordinates: [80.2710, 13.0840] } },
    
    // Medium-high density - T. Nagar
    { type: 'Feature' as const, properties: { intensity: 0.7 }, geometry: { type: 'Point' as const, coordinates: [80.2339, 13.0418] } },
    { type: 'Feature' as const, properties: { intensity: 0.65 }, geometry: { type: 'Point' as const, coordinates: [80.2350, 13.0430] } },
    { type: 'Feature' as const, properties: { intensity: 0.72 }, geometry: { type: 'Point' as const, coordinates: [80.2320, 13.0400] } },
    { type: 'Feature' as const, properties: { intensity: 0.68 }, geometry: { type: 'Point' as const, coordinates: [80.2360, 13.0410] } },
    
    // Medium density - Adyar
    { type: 'Feature' as const, properties: { intensity: 0.5 }, geometry: { type: 'Point' as const, coordinates: [80.2565, 13.0012] } },
    { type: 'Feature' as const, properties: { intensity: 0.55 }, geometry: { type: 'Point' as const, coordinates: [80.2580, 13.0030] } },
    { type: 'Feature' as const, properties: { intensity: 0.48 }, geometry: { type: 'Point' as const, coordinates: [80.2550, 13.0000] } },
    
    // Lower density - Velachery
    { type: 'Feature' as const, properties: { intensity: 0.35 }, geometry: { type: 'Point' as const, coordinates: [80.2180, 12.9815] } },
    { type: 'Feature' as const, properties: { intensity: 0.3 }, geometry: { type: 'Point' as const, coordinates: [80.2200, 12.9830] } },
    
    // Low density - Tambaram
    { type: 'Feature' as const, properties: { intensity: 0.2 }, geometry: { type: 'Point' as const, coordinates: [80.1270, 12.9249] } },
    { type: 'Feature' as const, properties: { intensity: 0.15 }, geometry: { type: 'Point' as const, coordinates: [80.1290, 12.9260] } },
    
    // Very low density - outskirts
    { type: 'Feature' as const, properties: { intensity: 0.1 }, geometry: { type: 'Point' as const, coordinates: [80.0500, 12.8500] } },
    { type: 'Feature' as const, properties: { intensity: 0.08 }, geometry: { type: 'Point' as const, coordinates: [80.3500, 13.1500] } },
  ]
};

export function HeatMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [80.2707, 13.0827], // Chennai, India
      zoom: 10,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add the heatmap source
      map.current.addSource('distress-calls', {
        type: 'geojson',
        data: distressCallData
      });

      // Add heatmap layer with blue to red gradient
      map.current.addLayer({
        id: 'distress-heat',
        type: 'heatmap',
        source: 'distress-calls',
        maxzoom: 15,
        paint: {
          // Increase weight based on intensity property
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0,
            1, 1
          ],
          // Increase intensity as zoom level increases
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 3
          ],
          // Color gradient from blue (low) to red (high)
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 255, 0)',
            0.1, 'rgba(65, 105, 225, 0.4)',
            0.3, 'rgba(0, 191, 255, 0.6)',
            0.5, 'rgba(50, 205, 50, 0.7)',
            0.7, 'rgba(255, 215, 0, 0.8)',
            0.85, 'rgba(255, 140, 0, 0.9)',
            1, 'rgba(220, 20, 60, 1)'
          ],
          // Adjust radius by zoom level
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 15,
            15, 30
          ],
          // Decrease opacity at higher zoom levels
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,
            15, 0.6
          ]
        }
      });

      setIsMapLoaded(true);
    });
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      initializeMap(tokenInput.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
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
        {!mapboxToken ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-foreground">
                  To display the interactive heatmap, please enter your Mapbox public token.
                </p>
                <p className="text-xs text-muted-foreground">
                  Get your free token at{' '}
                  <a 
                    href="https://mapbox.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                  {' '}→ Dashboard → Tokens
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="pk.eyJ1Ijoi..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit} disabled={!tokenInput.trim()}>
                Load Map
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div 
              ref={mapContainer} 
              className="w-full h-[400px] rounded-lg overflow-hidden border border-border/50"
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
        )}
      </CardContent>
    </Card>
  );
}
