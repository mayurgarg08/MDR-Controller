// HospitalMap.js
import React from "react";
import {
  MapContainer,
  ImageOverlay,
  Polygon,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const imageUrl = "/hospital-floorplan.png";

// adjust to your image pixel dimensions (height, width)
const imageBounds = [
  [0, 0],     // bottom-left
  [1000, 1500] // top-right (height, width)
];

// risk zones polygons
const zones = [
  {
    name: "POD 6 Risk Zone",
    color: "red",
    coords: [
      [200, 300],
      [200, 400],
      [350, 400],
      [350, 300],
    ],
  },
  {
    name: "ICU Risk Zone",
    color: "red",
    coords: [
      [600, 200],
      [600, 350],
      [750, 350],
      [750, 200],
    ],
  },
  {
    name: "Sterilization",
    color: "orange",
    coords: [
      [900, 300],
      [900, 450],
      [1050, 450],
      [1050, 300],
    ],
  },
];

export default function HospitalMap() {
  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[500, 750]}
      zoom={-1}
      style={{ height: "100%", width: "100%" }}
    >
      <ImageOverlay url={imageUrl} bounds={imageBounds} />
      {zones.map((zone, i) => (
        <Polygon
          key={i}
          positions={zone.coords}
          pathOptions={{
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.4,
          }}
        >
          <Tooltip>{zone.name}</Tooltip>
        </Polygon>
      ))}
    </MapContainer>
  );
}
