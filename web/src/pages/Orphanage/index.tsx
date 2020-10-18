import React, { useEffect, useState } from "react";
import api, { baseURL } from "../../services/api";
import Sidebar from "../../components/Sidebar";
import mapIcon from "../../util/mapIcon";
import IOrphanage from "../../interfaces/Orphanage";
import OrphanageParams from "../../interfaces/OrphanageParams";
import "./style.css";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import Image from "../../interfaces/Image";

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<IOrphanage>();
  const [mainImage, setMainImage] = useState<Image>();

  useEffect(() => {
    api.get<IOrphanage>(`orphanage/${params.id}`).then((response) => {
      setOrphanage(response.data);
      setMainImage(response.data.images[0]);
    });
  }, [params.id]);

  if (!orphanage) {
    return <h1>Carregando</h1>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={`${baseURL}/uploads/${mainImage?.name}`}
            alt="Lar das meninas"
          />

          <div className="images">
            {orphanage.images &&
              orphanage.images.map((image, index) => (
                <button 
                  className={ image === mainImage ? 'active' : '' }
                  type="button"
                  onClick={() => setMainImage(image)}
                  key={index}
                >
                  <img
                    src={`${baseURL}/uploads/${image.name}`}
                    alt={orphanage.name}
                  />
                </button>
              ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a href="/#">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ?
              (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : 
              (
                <div className="dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
