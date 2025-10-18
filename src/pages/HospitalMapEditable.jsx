import React, { useState, useEffect } from "react";
import {
  MapContainer,
  ImageOverlay,
  FeatureGroup,
  Polygon,
  Popup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const imageUrl = "/images/hospital.jpg";
const imageBounds = [
  [0, 0],
  [1000, 1500], // adjust to your image's dimensions
];

export default function HospitalMapEditableWithForm() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("zones");
    if (saved) setZones(JSON.parse(saved));
  }, []);

  const saveZones = (newZones) => {
    setZones(newZones);
    localStorage.setItem("zones", JSON.stringify(newZones));
  };

  const extractCoords = (layer) =>
    layer.getLatLngs()[0].map((ll) => [ll.lat, ll.lng]);

  const onCreated = (e) => {
    const coords = extractCoords(e.layer);
    // Prompt user for metadata
    const name = prompt("Enter zone name (e.g., ICU Risk Zone):", "New Zone");
    if (!name) {
      // if cancelled, just discard
      e.layer.remove();
      return;
    }
    const risk = prompt("Enter risk level (safe / warning / critical):", "critical");
    const newZone = {
      coords,
      name,
      risk: risk?.toLowerCase() || "critical",
    };
    const newZones = [...zones, newZone];
    saveZones(newZones);
  };

  const onEdited = (e) => {
    // We can't prompt here, but we’ll keep the existing metadata
    // Grab all current polygons from layers
    const updatedZones = [];
    let i = 0;
    e.target.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        // keep metadata from original zones by index
        updatedZones.push({
          ...zones[i],
          coords: extractCoords(layer),
        });
        i++;
      }
    });
    saveZones(updatedZones);
  };

  const onDeleted = (e) => {
    // Rebuild zones from remaining layers
    const remainingZones = [];
    let i = 0;
    e.target.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        remainingZones.push({
          ...zones[i],
          coords: extractCoords(layer),
        });
        i++;
      }
    });
    saveZones(remainingZones);
  };

  // Helper to color polygons
  const riskColor = (risk) => {
    if (risk === "critical") return "red";
    if (risk === "warning") return "#facc15";
    return "#34d399";
  };

  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[500, 750]}
      zoom={-1}
      style={{ height: "500px", width: "100%" }}
    >
      <ImageOverlay url={imageUrl} bounds={imageBounds} />

      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              shapeOptions: {
                color: "red",
                fillColor: "red",
                fillOpacity: 0.4,
              },
            },
          }}
          edit={{ remove: true }}
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={onDeleted}
        />

        {/* Render saved polygons */}
        {zones.map((z, i) => (
          <Polygon
            key={i}
            positions={z.coords}
            pathOptions={{
              color: riskColor(z.risk),
              fillColor: riskColor(z.risk),
              fillOpacity: 0.4,
            }}
          >
            <Popup>
              <div>
                <strong>{z.name}</strong>
                <br />
                Risk: <span style={{ textTransform: "capitalize" }}>{z.risk}</span>
                <br />
                Points: {z.coords.length}
              </div>
            </Popup>
          </Polygon>
        ))}
      </FeatureGroup>
    </MapContainer>
  );
}
