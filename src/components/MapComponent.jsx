// components/MapComponent.js
"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapComponent({ mapCoords }) {
  return (
    <MapContainer 
      center={[mapCoords?.lat || 6.433, mapCoords?.lng || 3.452]} 
      zoom={15} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[mapCoords?.lat || 6.433, mapCoords?.lng || 3.452]} icon={customIcon}>
        <Popup>
          <b>Vertex Diagnostic Center</b><br /><br />Lekki Phase 1, Lagos
        </Popup>
      </Marker>
      <Circle
        center={[mapCoords?.lat || 6.433, mapCoords?.lng || 3.452]}
        pathOptions={{ color: 'teal', fillColor: '#0d9488', fillOpacity: 0.2 }}
        radius={200}
      />
    </MapContainer>
  );
}