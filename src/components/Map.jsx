import React, { useState } from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { shadowDataOnMap } from "./../utils";

const Map = ({ center, zoom, countries, casesType }) => {
  const [map, setMap] = useState(null);

  if (map !== null) {
    map.flyTo(center);
  }

  return (
    <div className="map">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shadowDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;
