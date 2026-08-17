'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { WebStation } from '@/lib/stations-data'
import { Navigation, Plus, Minus, Layers, Crosshair } from 'lucide-react'

interface LeafletMapProps {
  stations: WebStation[]
  activeStation: WebStation | null
  onSelectStation: (id: string) => void
  userLocation: { lat: number; lng: number } | null
}

type MapLayerType = 'streets' | 'satellite'

export default function LeafletMap({
  stations,
  activeStation,
  onSelectStation,
  userLocation,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const markersRef = useRef<{ [id: string]: L.Marker }>({})
  const [currentLayer, setCurrentLayer] = useState<MapLayerType>('streets')

  // Map Tile Layers
  const tileUrls: Record<MapLayerType, { url: string; attr: string }> = {
    streets: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attr: '&copy; CARTO &copy; Map Contributors',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attr: '&copy; Esri &mdash; Satellite Imagery',
    },
  }

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629], // Center of India
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: true,
      })

      const baseTile = L.tileLayer(tileUrls.streets.url, {
        attribution: tileUrls.streets.attr,
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map)

      tileLayerRef.current = baseTile
      mapInstanceRef.current = map

      // Invalidate size for mobile screens after render
      setTimeout(() => {
        map.invalidateSize()
      }, 250)
    }

    const handleResize = () => {
      mapInstanceRef.current?.invalidateSize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Switch Map Layer (Street / Satellite)
  const toggleMapLayer = () => {
    const next: MapLayerType = currentLayer === 'streets' ? 'satellite' : 'streets'
    setCurrentLayer(next)

    if (mapInstanceRef.current && tileLayerRef.current) {
      tileLayerRef.current.setUrl(tileUrls[next].url)
    }
  }

  // Zoom & Recenter Helpers
  const zoomIn = () => mapInstanceRef.current?.zoomIn()
  const zoomOut = () => mapInstanceRef.current?.zoomOut()
  const recenterGPS = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1.0 })
    } else if (activeStation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([activeStation.latitude, activeStation.longitude], 14, { duration: 1.0 })
    }
  }

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    // Add User Current Location GPS Pulse Dot
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="position:relative; width:22px; height:22px;">
            <div style="position:absolute; inset:-8px; border-radius:50%; background:rgba(37,99,235,0.3); animation:pulse 1.8s infinite;"></div>
            <div style="width:22px; height:22px; border-radius:50%; background:#2563eb; border:3px solid #ffffff; box-shadow:0 3px 8px rgba(0,0,0,0.35);"></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })

      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 500,
      }).addTo(map)
      userMarker.bindTooltip('Your Location', { permanent: false, direction: 'top' })
    }

    // Add Petrol Pump Markers
    stations.forEach((stn) => {
      const isSelected = activeStation?.id === stn.id
      const brandColor =
        stn.brand === 'IndianOil'
          ? '#ea580c' // IndianOil Orange
          : stn.brand === 'HPCL'
          ? '#dc2626' // HPCL Red
          : stn.brand === 'BPCL'
          ? '#2563eb' // BPCL Blue
          : '#16a34a' // Emerald Green

      const shortBrand =
        stn.brand === 'IndianOil' ? 'XP100' : stn.brand === 'HPCL' ? 'poWer100' : 'Speed 97'

      // Clean, unmistakable Fuel Pump Pin Icon with crisp nozzle and gas meter
      const customIcon = L.divIcon({
        className: `custom-pump-pin ${isSelected ? 'pin-active' : ''}`,
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.25)' : 'scale(1.0)'};
            transition: transform 0.2s ease;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          ">
            <!-- Price Bubble on Top -->
            <div style="
              background: ${isSelected ? '#0f172a' : '#ffffff'};
              color: ${isSelected ? '#ffffff' : '#0f172a'};
              font-family: system-ui, -apple-system, sans-serif;
              font-size: 11px;
              font-weight: 800;
              padding: 3px 8px;
              border-radius: 9999px;
              border: 1.5px solid ${isSelected ? '#22c55e' : '#cbd5e1'};
              white-space: nowrap;
              margin-bottom: 3px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.15);
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#22c55e;"></span>
              <span>₹${stn.price.toFixed(0)} • ${shortBrand}</span>
            </div>

            <!-- Dedicated Petrol Pump Teardrop Pin -->
            <div style="
              position: relative;
              width: 36px;
              height: 36px;
              background: ${isSelected ? '#15803d' : brandColor};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2.5px solid #ffffff;
              ${isSelected ? 'box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.4);' : ''}
            ">
              <!-- Crisp Vector Fuel Pump / Petrol Dispenser Icon -->
              <svg
                style="transform: rotate(45deg); width: 18px; height: 18px; fill: #ffffff;"
                viewBox="0 0 24 24"
              >
                <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.22v5.72c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V6h6v4z" />
              </svg>
            </div>
          </div>
        `,
        iconSize: [80, 72],
        iconAnchor: [40, 72],
        popupAnchor: [0, -68],
      })

      const marker = L.marker([stn.latitude, stn.longitude], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(map)

      // Clean, Plain-Language Info Popup
      const popupHtml = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 230px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 6px;">
            <span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px;">
              0% Ethanol (E0)
            </span>
            <span style="color: #15803d; font-size: 11px; font-weight: 800;">
              ${stn.fuelGrade}
            </span>
          </div>

          <h4 style="font-size: 14px; font-weight: 800; margin: 0 0 4px 0; color: #0f172a; line-height: 1.25;">
            ${stn.name}
          </h4>

          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.35;">
            ${stn.address}
          </p>

          <div style="background: #f8fafc; border-radius: 8px; padding: 6px 8px; margin-bottom: 8px; border: 1px solid #e2e8f0; font-size: 11px; display: flex; justify-content: space-between;">
            <span style="color: #475569;">Price: <strong style="color: #166534;">₹${stn.price.toFixed(2)}/L</strong></span>
            <span style="color: #15803d; font-weight: 700;">✓ Pure Petrol</span>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=${stn.latitude},${stn.longitude}"
            target="_blank"
            rel="noreferrer"
            style="
              display: block;
              text-align: center;
              background: #16a34a;
              color: #ffffff;
              font-size: 11px;
              font-weight: 700;
              padding: 7px 10px;
              border-radius: 8px;
              text-decoration: none;
            "
          >
            Open in Google Maps ↗
          </a>
        </div>
      `

      marker.bindPopup(popupHtml, { maxWidth: 280 })

      marker.on('click', () => {
        onSelectStation(stn.id)
      })

      markersRef.current[stn.id] = marker
    })

    // Fit bounds
    if (stations.length > 0) {
      if (activeStation) {
        map.flyTo([activeStation.latitude, activeStation.longitude], 14, {
          duration: 1.0,
        })
      } else {
        const group = L.featureGroup(Object.values(markersRef.current))
        map.fitBounds(group.getBounds().pad(0.12))
      }
    }
  }, [stations, activeStation, onSelectStation, userLocation])

  // Fly to active station smoothly
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !activeStation) return

    map.flyTo([activeStation.latitude, activeStation.longitude], 14, {
      duration: 1.0,
    })

    const marker = markersRef.current[activeStation.id]
    if (marker) {
      marker.openPopup()
    }
  }, [activeStation])

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-border shadow-lg group">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="h-full w-full min-h-[380px] lg:min-h-[460px] z-0" />

      {/* Map Style & Location Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={toggleMapLayer}
          className="flex items-center gap-1.5 rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2 text-xs font-bold text-slate-800 shadow-md border border-slate-200/80 hover:bg-white transition-all hover:scale-[1.02]"
          title="Switch Map Style"
        >
          <Layers size={15} className="text-primary" />
          <span className="capitalize">{currentLayer === 'streets' ? 'Satellite View' : 'Road Map'}</span>
        </button>

        <button
          onClick={recenterGPS}
          className="grid size-10 place-items-center rounded-2xl bg-white/95 backdrop-blur text-slate-800 shadow-md border border-slate-200/80 hover:bg-white transition-all hover:scale-[1.05]"
          title="Center on My Location"
        >
          <Crosshair size={18} className="text-primary" />
        </button>
      </div>

      {/* Floating Zoom Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col rounded-2xl overflow-hidden bg-white/95 backdrop-blur shadow-md border border-slate-200/80">
        <button
          onClick={zoomIn}
          className="grid size-10 place-items-center text-slate-700 hover:bg-slate-100 transition-colors border-b border-slate-100 font-bold"
          title="Zoom In"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={zoomOut}
          className="grid size-10 place-items-center text-slate-700 hover:bg-slate-100 transition-colors font-bold"
          title="Zoom Out"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* Selected Petrol Pump Quick Strip (Bottom Left) */}
      {activeStation && (
        <div className="absolute bottom-6 left-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-2.5 shadow-lg border border-slate-200/80 max-w-md">
          <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 font-black text-xs">
            ⛽
          </div>
          <div className="truncate">
            <h5 className="text-xs font-bold text-slate-900 truncate">{activeStation.name}</h5>
            <span className="text-[11px] text-slate-500">{activeStation.fuelGrade} • ₹{activeStation.price.toFixed(1)}/L</span>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${activeStation.latitude},${activeStation.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/90 shadow-xs"
          >
            <Navigation size={12} /> Maps
          </a>
        </div>
      )}
    </div>
  )
}
