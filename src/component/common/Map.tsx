import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import type { TourLocation } from "../../../types/tour";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });



const DefaultIcon = new L.Icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  coordinates?: [number, number];
  location?: TourLocation[];
}

const Map = ({ coordinates, location }: MapProps) => {
  
  console.log(location);
  if (!coordinates) {
    return (
      <div className="flex h-full w-full items-center justify-center text-slate-500">
        Map location coming soon.
      </div>
    );
  }

  const position: [number, number] = [coordinates[1], coordinates[0]];
  const route = [
    position, // Start location
    ...(location?.map((item) => [item.coordinates[1], item.coordinates[0]]) ??
      []),
  ];
  return (
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <Marker position={position} icon={DefaultIcon}>
        <Popup>Start Location</Popup>
      </Marker>
      <TileLayer
        attribution=' See your journey on map '
         url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {/* Draw the route */}
      <Polyline positions={route}  pathOptions={{
    color: "#10b981",
    weight: 5,
    opacity: 0.8,
    dashArray: "10 10",
  }}/>
      {/* Tour Stop Markers */}
      {/* {locations?.map((location) => {
        const markerPosition: [number, number] = [
          location.coordinates[1],
          location.coordinates[0],
        ];

        console.log(markerPosition);

        return <Marker key={location._id} position={markerPosition} />;
      })} */}
      {location?.map((location) => {
        const markerPosition: [number, number] = [
          location.coordinates[1],
          location.coordinates[0],
        ];

        return (
          <Marker
            key={location._id}
            position={markerPosition}
            icon={DefaultIcon}
          >
            <Popup>{location.description}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
