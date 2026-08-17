'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { WebStation } from '@/lib/stations-data'
import { Navigation, Plus, Minus, Layers, Compass, Crosshair, Star } from 'lucide-react'

interface LeafletMapProps {
  stations: WebStation[]
  activeStation: WebStation | null
  onSelectStation: (id: string) => void
  userLocation: { lat: number; lng: number } | null
}

type MapLayerType = 'streets' | 'satellite' | 'terrain'

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

  // Map Tile Layers (100% Free, High Quality Open Vectors)
  const tileUrls: Record<MapLayerType, { url: string; attr: string }> = {
    streets: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attr: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attr: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
    terrain: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  }

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629], // India Center
        zoom: 5,
        zoomControl: false, // We render custom Google Maps style controls
        scrollWheelZoom: true,
      })

      const baseTile = L.tileLayer(tileUrls.streets.url, {
        attribution: tileUrls.streets.attr,
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map)

      tileLayerRef.current = baseTile
      mapInstanceRef.current = map
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Switch Map Layer
  const toggleMapLayer = () => {
    const next: MapLayerType = currentLayer === 'streets' ? 'satellite' : 'streets'
    setCurrentLayer(next)

    if (mapInstanceRef.current && tileLayerRef.current) {
      tileLayerRef.current.setUrl(tileUrls[next].url)
    }
  }

  // Zoom Helpers
  const zoomIn = () => mapInstanceRef.current?.zoomIn()
  const zoomOut = () => mapInstanceRef.current?.zoomOut()
  const recenterGPS = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1.2 })
    } else if (activeStation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([activeStation.latitude, activeStation.longitude], 14, { duration: 1.2 })
    }
  }

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    // Add GPS User Pulsing Location Dot
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="position:relative; width:22px; height:22px;">
            <div style="position:absolute; inset:-10px; border-radius:50%; background:rgba(37,99,235,0.25); animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
            <div style="position:absolute; inset:-4px; border-radius:50%; background:rgba(37,99,235,0.4);"></div>
            <div style="width:22px; height:22px; border-radius:50%; background:#2563EB; border:3px solid #FFFFFF; box-shadow:0 3px 8px rgba(0,0,0,0.35);"></div>
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

    // Add Google Maps Style Teardrop Stations
    stations.forEach((stn) => {
      const isSelected = activeStation?.id === stn.id
      const pinColor = isSelected ? '#15803d' : '#16a34a'
      const brandLogo = stn.brandLogo || '/app-icon.png'
      const shortBrand = stn.brand === 'IndianOil' ? 'XP100' : stn.brand === 'HPCL' ? 'poWer100' : 'Speed 97'

      const customIcon = L.divIcon({
        className: `custom-gmap-pin ${isSelected ? 'pin-active' : ''}`,
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.22)' : 'scale(1.0)'};
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.35));
          ">
            <!-- Price Floating Pill -->
            <div style="
              background: ${isSelected ? '#0f172a' : '#ffffff'};
              color: ${isSelected ? '#ffffff' : '#0f172a'};
              font-size: 11px;
              font-weight: 800;
              padding: 3px 8px;
              border-radius: 9999px;
              border: 1.5px solid ${isSelected ? '#22c55e' : '#e2e8f0'};
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

            <!-- Teardrop Pin Container -->
            <div style="
              position: relative;
              width: 38px;
              height: 38px;
              background: ${pinColor};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid #ffffff;
              ${isSelected ? 'box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.35);' : ''}
            ">
              <!-- Company Brand Logo Thumbnail inside Pin -->
              <div style="
                transform: rotate(45deg);
                width: 22px;
                height: 22px;
                background: #ffffff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                padding: 2px;
              ">
                <img src="${brandLogo}" alt="${stn.brand}" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>
            </div>
          </div>
        `,
        iconSize: [80, 75],
        iconAnchor: [40, 75],
        popupAnchor: [0, -70],
      })

      const marker = L.marker([stn.latitude, stn.longitude], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(map)

      // Google Maps-Style Rich Popup Card
      const popupHtml = `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; min-width: 240px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 6px;">
            <span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px;">
              ${stn.fuelGrade}
            </span>
            <span style="color: #d97706; font-size: 11px; font-weight: 800;">
              ★ ${stn.rating} (${stn.reviewCount})
            </span>
          </div>

          <h4 style="font-size: 14px; font-weight: 800; margin: 0 0 4px 0; color: #0f172a; line-height: 1.25;">
            ${stn.name}
          </h4>

          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.35;">
            ${stn.address}
          </p>

          <div style="background: #f8fafc; border-radius: 8px; padding: 6px 8px; margin-bottom: 8px; border: 1px solid #e2e8f0; font-size: 11px; display: flex; justify-content: space-between;">
            <span style="color: #475569;">Density: <strong>${stn.density}</strong></span>
            <span style="color: #166534; font-weight: 800;">₹${stn.price.toFixed(2)}/L</span>
          </div>

          <div style="display: flex; gap: 6px;">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=${stn.latitude},${stn.longitude}"
              target="_blank"
              rel="noreferrer"
              style="
                flex: 1;
                text-align: center;
                background: #16a34a;
                color: #ffffff;
                font-size: 11px;
                font-weight: 700;
                padding: 7px 10px;
                border-radius: 8px;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
              "
            >
              Directions ↗
            </a>
            ${
              stn.phone
                ? `<a href="tel:${stn.phone}" style="background: #f1f5f9; color: #0f172a; font-size: 11px; font-weight: 700; padding: 7px 10px; border-radius: 8px; text-decoration: none; border: 1px solid #cbd5e1;">Call</a>`
                : ''
            }
          </div>
        </div>
      `

      marker.bindPopup(popupHtml, { maxWidth: 280 })

      marker.on('click', () => {
        onSelectStation(stn.id)
      })

      markersRef.current[stn.id] = marker
    })

    // Fit bounds if needed
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

  // Pan smoothly to active station
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
      {/* Map Tile Container */}
      <div ref={mapContainerRef} className="h-full w-full min-h-[380px] lg:min-h-[460px] z-0" />

      {/* Google Maps Style Floating Layer Switcher (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={toggleMapLayer}
          className="flex items-center gap-1.5 rounded-2xl bg-white/95 backdrop-blur px-3.5 py-2 text-xs font-bold text-slate-800 shadow-md border border-slate-200/80 hover:bg-white transition-all hover:scale-[1.02]"
          title="Switch Map Style"
        >
          <Layers size={15} className="text-primary" />
          <span className="capitalize">{currentLayer === 'streets' ? 'Satellite' : 'Street Map'}</span>
        </button>

        <button
          onClick={recenterGPS}
          className="grid size-10 place-items-center rounded-2xl bg-white/95 backdrop-blur text-slate-800 shadow-md border border-slate-200/80 hover:bg-white transition-all hover:scale-[1.05]"
          title="Recenter Map"
        >
          <Crosshair size={18} className="text-primary" />
        </button>
      </div>

      {/* Google Maps Style Floating Zoom Controls (Bottom Right) */}
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

      {/* Active Station Floating Quick Strip (Bottom Left) */}
      {activeStation && (
        <div className="absolute bottom-6 left-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-2.5 shadow-lg border border-slate-200/80 max-w-md">
          <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary shrink-0 font-black text-xs">
            E0
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
            <Navigation size={12} /> Go
          </a>
        </div>
      )}
    </div>
  )
}
