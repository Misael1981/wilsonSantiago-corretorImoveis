```
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  height: 40vh;
  @media screen and (min-width: 1020px) {
    min-height: unset;
    height: 100%;
  }
`;

const MapLocation = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
  });

  const position = {
    lat: -22.234165644473553,
    lng: -45.936176118928095,
  };

  return (
    <MapWrapper>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
          <Marker position={position} title="Localização da Essenza Imóveis" />
        </GoogleMap>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </MapWrapper>
  );
};

export default MapLocation;

```
