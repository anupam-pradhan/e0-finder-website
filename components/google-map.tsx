'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { WebStation } from '@/lib/stations-data'
import { Navigation, Plus, Minus, Layers, Crosshair, Car, ShieldCheck, ExternalLink, MapPin, AlertCircle } from 'lucide-react'

interface GoogleMapProps {
  stations: WebStation[]
  activeStation: WebStation | null
  onSelectStation: (id: string) => void
  userLocation: { lat: number; lng: number } | null
  apiKey?: string
}

let hasConfiguredLoader = false

function configureGoogleMapsLoader(apiKey: string) {
  if (hasConfiguredLoader || !apiKey) return
  try {
    setOptions({
      key: apiKey,
      v: 'weekly',
    })
    hasConfiguredLoader = true
  } catch (_) {}
}

export default function GoogleMapComponent({
  stations,
  activeStation,
  onSelectStation,
  userLocation,
  apiKey: propApiKey,
}: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null)
  const markersRef = useRef<{ [id: string]: google.maps.Marker }>({})
  const userMarkerRef = useRef<google.maps.Marker | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  const [mapType, setMapType] = useState<'roadmap' | 'hybrid'>('roadmap')
  const [trafficEnabled, setTrafficEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const apiKey = propApiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  // Initialize Google Maps API
  useEffect(() => {
    if (!mapContainerRef.current) return

    let isMounted = true

    const initMap = async () => {
      try {
        if (!apiKey) {
          setIsLoading(false)
          setLoadError('Google Maps API key is missing. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local.')
          return
        }

        configureGoogleMapsLoader(apiKey)

        const { Map, TrafficLayer, InfoWindow } = await importLibrary('maps')
        await importLibrary('marker')

        if (!isMounted || !mapContainerRef.current) return

        // Default center: India or active station / user location
        const defaultCenter = userLocation
          ? { lat: userLocation.lat, lng: userLocation.lng }
          : activeStation
          ? { lat: activeStation.latitude, lng: activeStation.longitude }
          : { lat: 20.5937, lng: 78.9629 } // Center of India

        const defaultZoom = userLocation || activeStation ? 13 : 5

        const map = new Map(mapContainerRef.current, {
          center: defaultCenter,
          zoom: defaultZoom,
          mapTypeId: 'roadmap',
          disableDefaultUI: true, // We provide custom controls matching the theme
          clickableIcons: false,
          gestureHandling: 'greedy',
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ lightness: 10 }],
            },
          ],
        })

        mapInstanceRef.current = map
        trafficLayerRef.current = new TrafficLayer()
        infoWindowRef.current = new InfoWindow()

        setIsLoading(false)
      } catch (err: any) {
        console.warn('[Google Maps initialization error]:', err)
        if (isMounted) {
          setIsLoading(false)
          setLoadError(err.message || 'Failed to load Google Maps.')
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null
      }
    }
  }, [apiKey])

  // Toggle Map Type (Roadmap / Satellite Hybrid)
  const toggleMapType = () => {
    if (!mapInstanceRef.current) return
    const nextType = mapType === 'roadmap' ? 'hybrid' : 'roadmap'
    setMapType(nextType)
    mapInstanceRef.current.setMapTypeId(nextType)
  }

  // Toggle Live Traffic Layer
  const toggleTraffic = () => {
    if (!mapInstanceRef.current || !trafficLayerRef.current) return
    const next = !trafficEnabled
    setTrafficEnabled(next)
    trafficLayerRef.current.setMap(next ? mapInstanceRef.current : null)
  }

  // Zoom Helpers
  const zoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom((mapInstanceRef.current.getZoom() || 12) + 1)
    }
  }

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom((mapInstanceRef.current.getZoom() || 12) - 1)
    }
  }

  // Recenter on GPS location or active station
  const recenterGPS = () => {
    if (!mapInstanceRef.current) return
    if (userLocation) {
      mapInstanceRef.current.panTo({ lat: userLocation.lat, lng: userLocation.lng })
      mapInstanceRef.current.setZoom(14)
    } else if (activeStation) {
      mapInstanceRef.current.panTo({ lat: activeStation.latitude, lng: activeStation.longitude })
      mapInstanceRef.current.setZoom(14)
    }
  }

  // Render SVG Marker Icon with Brand Colors
  const getMarkerIcon = useCallback(
    (stn: WebStation, isSelected: boolean) => {
      const brandColor =
        stn.brand === 'IndianOil'
          ? '#ea580c' // IndianOil Orange
          : stn.brand === 'HPCL'
          ? '#dc2626' // HPCL Red
          : stn.brand === 'BPCL'
          ? '#2563eb' // BPCL Blue
          : '#16a34a' // Emerald Green

      const size = isSelected ? 44 : 36
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 36 44" fill="none">
          <filter id="shadow-${stn.id}" x="-4" y="-2" width="44" height="52" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="rgba(0,0,0,0.35)"/>
          </filter>
          <g filter="url(#shadow-${stn.id})">
            <path d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 24 18 24s18-10.5 18-24C36 8.059 27.941 0 18 0z" fill="${brandColor}"/>
            <circle cx="18" cy="17" r="13" fill="#ffffff"/>
            <circle cx="18" cy="17" r="11" fill="${isSelected ? brandColor : '#ffffff'}"/>
            <!-- Fuel Pump Glyph -->
            <path d="M14 11h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V12a1 1 0 0 1 1-1zm1 3h4v4h-4v-4zm7 0h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1" 
                  stroke="${isSelected ? '#ffffff' : brandColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>
      `

      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(size, size + 8),
        anchor: new google.maps.Point(size / 2, size + 8),
      }
    },
    []
  )

  // Update User GPS Marker
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || typeof google === 'undefined') return

    if (userLocation) {
      const userDotSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
          <circle cx="14" cy="14" r="12" fill="rgba(37,99,235,0.25)"/>
          <circle cx="14" cy="14" r="7" fill="#2563eb" stroke="#ffffff" stroke-width="2.5"/>
        </svg>
      `

      if (userMarkerRef.current) {
        userMarkerRef.current.setPosition({ lat: userLocation.lat, lng: userLocation.lng })
      } else {
        userMarkerRef.current = new google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          map,
          title: 'Your Current GPS Location',
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(userDotSvg)}`,
            scaledSize: new google.maps.Size(28, 28),
            anchor: new google.maps.Point(14, 14),
          },
          zIndex: 999,
        })
      }
    } else if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null)
      userMarkerRef.current = null
    }
  }, [userLocation])

  // Update Station Markers
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || typeof google === 'undefined') return

    // Clear removed markers
    const currentIds = new Set(stations.map((s) => s.id))
    Object.keys(markersRef.current).forEach((id) => {
      if (!currentIds.has(id)) {
        markersRef.current[id].setMap(null)
        delete markersRef.current[id]
      }
    })

    // Add or update markers
    stations.forEach((stn) => {
      const isSelected = activeStation?.id === stn.id
      const position = { lat: stn.latitude, lng: stn.longitude }

      if (markersRef.current[stn.id]) {
        markersRef.current[stn.id].setIcon(getMarkerIcon(stn, isSelected))
        markersRef.current[stn.id].setZIndex(isSelected ? 500 : 10)
      } else {
        const marker = new google.maps.Marker({
          position,
          map,
          title: stn.name,
          icon: getMarkerIcon(stn, isSelected),
          zIndex: isSelected ? 500 : 10,
        })

        marker.addListener('click', () => {
          onSelectStation(stn.id)

          // Show rich Google Maps InfoWindow
          if (infoWindowRef.current) {
            const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${stn.latitude},${stn.longitude}&destination_place_id=${encodeURIComponent(stn.name)}`
            const content = `
              <div style="font-family: system-ui, sans-serif; padding: 6px 4px; max-width: 270px; color: #0f172a;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                  <span style="background: #e0f2fe; color: #0284c7; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px; text-transform: uppercase;">
                    ${stn.fuelGrade}
                  </span>
                  <span style="font-size: 11px; font-weight: 700; color: #16a34a;">₹${stn.price.toFixed(1)}/L</span>
                </div>
                <h4 style="font-size: 13px; font-weight: 800; margin: 0 0 3px 0; line-height: 1.3; color: #0f172a;">
                  ${stn.name}
                </h4>
                <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.4;">
                  ${stn.address}
                </p>
                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 4px;">
                  <span style="font-size: 10px; color: #64748b; font-family: monospace;">
                    Density: <strong style="color: #0f172a;">${stn.density}</strong>
                  </span>
                  <a href="${navUrl}" target="_blank" rel="noopener noreferrer" 
                     style="background: #16a34a; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
                    Directions ↗
                  </a>
                </div>
              </div>
            `
            infoWindowRef.current.setContent(content)
            infoWindowRef.current.open(map, marker)
          }
        })

        markersRef.current[stn.id] = marker
      }
    })
  }, [stations, activeStation, onSelectStation, getMarkerIcon])

  // Center on active station when it changes
  useEffect(() => {
    if (!mapInstanceRef.current || !activeStation) return
    mapInstanceRef.current.panTo({
      lat: activeStation.latitude,
      lng: activeStation.longitude,
    })
    if ((mapInstanceRef.current.getZoom() || 0) < 12) {
      mapInstanceRef.current.setZoom(13)
    }
  }, [activeStation?.id])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border shadow-md">
      {/* Google Map Container Element */}
      <div ref={mapContainerRef} className="h-full w-full bg-muted/40 min-h-[420px] lg:min-h-[500px]" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs gap-3">
          <div className="size-8 rounded-full border-3 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-bold text-muted-foreground">Initializing Google Maps...</span>
        </div>
      )}

      {/* Fallback Warning if API Key is missing or rejected */}
      {loadError && (
        <div className="absolute inset-x-4 top-4 z-30 flex items-center justify-between rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 backdrop-blur shadow-lg">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-amber-500 shrink-0" />
            <div className="text-xs">
              <strong className="font-bold text-foreground block">Google Maps API Setup</strong>
              <span className="text-muted-foreground">
                Set <code className="font-mono text-primary font-semibold">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in your environment to unlock full interactive features.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Custom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {/* Street / Satellite Toggle */}
        <button
          onClick={toggleMapType}
          title={mapType === 'roadmap' ? 'Switch to Satellite' : 'Switch to Roadmap'}
          className={`flex size-10 items-center justify-center rounded-2xl border shadow-lg backdrop-blur transition-all ${
            mapType === 'hybrid'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background/90 text-foreground border-border hover:bg-background'
          }`}
        >
          <Layers size={18} />
        </button>

        {/* Live Traffic Overlay Toggle */}
        <button
          onClick={toggleTraffic}
          title={trafficEnabled ? 'Hide Live Traffic' : 'Show Live Traffic'}
          className={`flex size-10 items-center justify-center rounded-2xl border shadow-lg backdrop-blur transition-all ${
            trafficEnabled
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
              : 'bg-background/90 text-foreground border-border hover:bg-background'
          }`}
        >
          <Car size={18} />
        </button>

        {/* Recenter / Locate Button */}
        <button
          onClick={recenterGPS}
          title="Center on GPS / Selected Station"
          className="flex size-10 items-center justify-center rounded-2xl border border-border bg-background/90 text-foreground shadow-lg backdrop-blur hover:bg-background hover:text-primary transition-colors"
        >
          <Crosshair size={18} />
        </button>

        {/* Zoom In & Out */}
        <div className="flex flex-col rounded-2xl border border-border bg-background/90 shadow-lg backdrop-blur overflow-hidden">
          <button
            onClick={zoomIn}
            title="Zoom in"
            className="flex size-10 items-center justify-center text-foreground hover:bg-muted/50 border-b border-border transition-colors"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={zoomOut}
            title="Zoom out"
            className="flex size-10 items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
          >
            <Minus size={18} />
          </button>
        </div>
      </div>

      {/* Traffic Status Indicator Badge */}
      {trafficEnabled && (
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 backdrop-blur shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Google Traffic Active
        </div>
      )}

      {/* Active Station Quick Overlay Bar at Bottom */}
      {activeStation && (
        <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-xs z-10 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary truncate">
                {activeStation.fuelGrade}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">₹{activeStation.price.toFixed(1)}/L</span>
            </div>
            <p className="mt-1 text-xs font-bold text-foreground truncate">{activeStation.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{activeStation.area}, {activeStation.city}</p>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${activeStation.latitude},${activeStation.longitude}&destination_place_id=${encodeURIComponent(activeStation.name)}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs transition-transform hover:scale-105"
          >
            <Navigation size={13} /> Go
          </a>
        </div>
      )}
    </div>
  )
}
