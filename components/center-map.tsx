'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Center = {
  name: string
  city: string
  country: string
  address: string
  open: boolean
  phone: string
  lat: number
  lng: number
}

function Recenter({ center }: { center: Center }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([center.lat, center.lng], 12, { duration: 0.8 })
  }, [center, map])
  return null
}

export function CenterMap({
  centers,
  active,
  onSelect,
  located,
  onLocate,
}: {
  centers: Center[]
  active: Center
  onSelect: (center: Center) => void
  located: boolean
  onLocate: () => void
}) {
  const icon = new L.DivIcon({
    className: 'custom-pin',
    html: '<span></span>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
  const activeIcon = new L.DivIcon({
    className: 'custom-pin custom-pin-active',
    html: '<span></span>',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  })
  return (
    <div className="real-map border-border relative overflow-hidden rounded-[2rem] border">
      <MapContainer
        center={[7.4, 2.5]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-[440px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter center={active} />
        {centers.map((center) => (
          <Marker
            key={center.name}
            position={[center.lat, center.lng]}
            icon={center.name === active.name ? activeIcon : icon}
            eventHandlers={{ click: () => onSelect(center) }}
          >
            <Popup>
              <strong>{center.name}</strong>
              <br />
              {center.city} · {center.open ? 'Ouvert maintenant' : 'Fermé aujourd’hui'}
            </Popup>
          </Marker>
        ))}
        {located && (
          <Marker position={[6.37, 2.43]}>
            <Popup>Votre position simulée · Cotonou</Popup>
          </Marker>
        )}
      </MapContainer>
      <button
        onClick={onLocate}
        className="map-locate bg-card text-primary absolute right-4 bottom-4 z-[1000] rounded-full px-4 py-2 text-xs font-semibold shadow-lg"
      >
        Simuler ma position
      </button>
    </div>
  )
}
