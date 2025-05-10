"use client";

import React, { useEffect, useState } from 'react'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L, { LatLngTuple, LeafletMouseEvent } from 'leaflet'
import { useToast } from '@/hooks/use-toast';

export default function Map() {

  function MapPlaceholder() {
    return (
      <p>
        Map.{' '}
        <noscript>You need to enable JavaScript to see this map.</noscript>
      </p>
    )
  }

  const [position, setPosition] = useState<any>(null)
  const [mapKey, setMapKey] = useState(0)
  const {toast}  = useToast()
  useEffect(() => {
    L.Icon.Default.imagePath = '/node_modules/leaflet/dist/images/'
    setMapKey(mapKey + 1)
    toast({
      title: "Instructions",
      description: "Cliquez sur la carte pour accéder à votre position",
      variant:'default'
    })

  }, [])

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position} icon={new L.Icon({
        iconUrl: '/map-pin.svg',
        iconSize: [37, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      })}>
        <Popup className='-mt-10'>
          Vous êtes ici
        </Popup>
      </Marker>
    )
  }

  return (
    <div>
      <MapContainer key={mapKey} center={{lat: 51.505, lng: -0.09 }} zoom={13} scrollWheelZoom={false}
        placeholder={<MapPlaceholder />}>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}
