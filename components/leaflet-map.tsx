'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { WebStation } from '@/lib/stations-data'

interface LeafletMapProps {
  stations: WebStation[]
  activeStation: WebStation | null
  onSelectStation: (id: string) => void
  userLocation: { lat: number; lng: number } | null
}

export default function LeafletMap({
  stations,
  activeStation,
  onSelectStation,
  userLocation,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [id: string]: L.Marker }>({})

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629], // India Center
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      // Standard OpenStreetMap tiles (100% Free, no API keys)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | E0 Finder',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update Markers when stations change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove())
    markersRef.current = {}

    // Add User Location Pulse Pin if available
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="position:relative; width:20px; height:20px;">
            <div style="position:absolute; inset:-8px; border-radius:50%; background:rgba(16,185,129,0.3); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:20px; height:20px; border-radius:50%; background:#10B981; border:3px solid #ffffff; box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map)
      userMarker.bindTooltip('Your Current GPS Location', { permanent: false, direction: 'top' })
    }

    // Add Station Markers
    stations.forEach((stn) => {
      const isSelected = activeStation?.id === stn.id
      const pinColor = isSelected ? '#15803d' : '#16a34a'
      const brandBadge = stn.brand === 'IndianOil' ? 'IOCL' : stn.brand === 'HPCL' ? 'HPCL' : 'BPCL'

      const customIcon = L.divIcon({
        className: 'custom-station-pin',
        html: `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            background: ${pinColor};
            color: #ffffff;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 11px;
            font-weight: 800;
            padding: ${isSelected ? '6px 12px' : '4px 8px'};
            border-radius: 9999px;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            white-space: nowrap;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1.0)'};
            transition: all 0.2s ease;
          ">
            <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#86efac;"></span>
            <span>${brandBadge} E0</span>
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      })

      const marker = L.marker([stn.latitude, stn.longitude], { icon: customIcon }).addTo(map)

      // Interactive Popup content
      const popupHtml = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 220px; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="background: #dcfce7; color: #166534; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px;">
              ${stn.fuelGrade}
            </span>
            ${stn.isCOCO ? '<span style="background:#dbeafe; color:#1e40af; font-size:10px; font-weight:700; padding:2px 6px; border-radius:9999px;">COCO</span>' : ''}
          </div>
          <h4 style="font-size: 14px; font-weight: 800; margin: 0 0 4px 0; color: #0f172a; line-height: 1.2;">
            ${stn.name}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.3;">
            ${stn.address}
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; border-top: 1px solid #e2e8f0; padding-top: 6px;">
            <span style="color: #475569;">Density: <strong>${stn.density}</strong></span>
            <span style="color: #166534; font-weight: 800;">₹${stn.price.toFixed(1)}/L</span>
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
              padding: 6px 12px;
              border-radius: 8px;
              text-decoration: none;
            "
          >
            Get GPS Directions ↗
          </a>
        </div>
      `

      marker.bindPopup(popupHtml)

      marker.on('click', () => {
        onSelectStation(stn.id)
      })

      markersRef.current[stn.id] = marker
    })

    // Fit bounds if stations are present
    if (stations.length > 0) {
      if (activeStation) {
        map.flyTo([activeStation.latitude, activeStation.longitude], 13, {
          duration: 1.2,
        })
      } else {
        const group = L.featureGroup(Object.values(markersRef.current))
        map.fitBounds(group.getBounds().pad(0.15))
      }
    }
  }, [stations, activeStation, onSelectStation, userLocation])

  // Fly to active station when selection changes
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !activeStation) return

    map.flyTo([activeStation.latitude, activeStation.longitude], 14, {
      duration: 1.2,
    })

    const marker = markersRef.current[activeStation.id]
    if (marker) {
      marker.openPopup()
    }
  }, [activeStation])

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-border shadow-md">
      <div ref={mapContainerRef} className="h-full w-full min-h-[380px] lg:min-h-[460px]" />
    </div>
  )
}
