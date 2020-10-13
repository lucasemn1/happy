import React from "react";
import {
  PageMap,
  Sidebar,
  Header,
  Title,
  Paragraph,
  Footer,
  CreateOrphanage,
} from "./style";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

export default function OrphanagesMap() {
  return (
    <PageMap>
      <Sidebar>
        <Header>
          <img
            src={require("../../assets/img/map-marker.svg")}
            alt="Logo Happy"
          />

          <Title>Escolha um orfanato no mapa</Title>
          <Paragraph>Muitas crianças estão esperando a sua visita :)</Paragraph>
        </Header>

        <Footer>
          <strong>Equador</strong>
          <span>Rio Grande do Norte</span>
        </Footer>
      </Sidebar>

      <Map center={[-6.9468731, -36.7161395]} zoom={16.5} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {/* <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> */}
      </Map>

      <CreateOrphanage to="#">
        <FiPlus size={32} color="#ffffff" />
      </CreateOrphanage>
    </PageMap>
  );
}
