import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapProps {
  coordinates: [number, number];
}

const Map = ({coordinates}) => {

    const position: [number, number] = [coordinates[1], coordinates[0]];
  return <>
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>,
  </>;
};

export default Map;
