import React, { useEffect, useState } from "react";
import mapIcon, { mapMarker } from "../../util/mapIcon";
import {
  PageMap,
  Sidebar,
  Header,
  Title,
  Paragraph,
  Footer,
  CreateOrphanage,
  Popup,
} from "./style";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Orphanage from "../../interfaces/Orphanage";

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <PageMap>
      <Sidebar>
        <Header>
          <img src={mapMarker} alt="Logo Happy" />

          <Title>Escolha um orfanato no mapa</Title>
          <Paragraph>Muitas crianças estão esperando a sua visita :)</Paragraph>
        </Header>

        <Footer>
          <strong>Equador</strong>
          <span>Rio Grande do Norte</span>
        </Footer>
      </Sidebar>

      <Map
        center={[-6.9468731, -36.7161395]}
        zoom={3}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {/* <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> */}
        {orphanages.map((orphanage, index) => (
          <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={index}>
            <Popup closeButton={false} minWidth={240} maxWidth={240}>
              {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#ffffff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <CreateOrphanage to="/orphanages/create">
        <FiPlus size={32} color="#ffffff" />
      </CreateOrphanage>
    </PageMap>
  );
}
