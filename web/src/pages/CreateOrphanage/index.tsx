import React, { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";
import Sidebar from "../../components/Sidebar";
import mapIcon from "../../util/mapIcon";
import OrphanageForm from "../../interfaces/OrphanageForm";
import api from "../../services/api";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();
  const [form, setForm] = useState<OrphanageForm>({
    name: '',
    about: '',
    instructions: '',
    open_on_weekends: true,
    opening_hours: '',
    latitude: 0,
    longitude: 0,
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    setForm({
      ...form,
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if(files) {
      setForm({ ...form, images: files});

      const images = Array.from(files);

      setPreviewImages(images.map(image => {
        return URL.createObjectURL(image);
      }));
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    if(!form.images) {
      return;
    }

    data.append('name', form.name);
    data.append('about', form.about);
    data.append('instructions', form.instructions);
    data.append('open_on_weekends', String(form.open_on_weekends));
    data.append('opening_hours', form.opening_hours);
    data.append('latitude', String(form.latitude));
    data.append('longitude', String(form.longitude));
    Array.from(form.images).forEach(image => {
      data.append('images', image);
    });

    api.post('/orphanages', data).then(resp => {
      alert('Orfanato cadastrado!');

      history.push('/map');      
    }).catch(err => {
      alert('Deu errado');
    });
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {form.latitude && form.longitude && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[form.latitude, form.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={form.about} 
                onChange={e => setForm({...form, about: e.target.value})}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => (
                  <img src={image} alt="" key={index}/>
                ))}
                <label htmlFor="image[]" className="new-image" >
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input type="file" id="image[]" onChange={handleSelectImages} multiple/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={form.instructions} 
                onChange={e => setForm({...form, instructions: e.target.value})}
                />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcioinamento</label>
              <input 
                id="opening_hours" 
                value={form.opening_hours} 
                onChange={e => setForm({...form, opening_hours: e.target.value})}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button"
                  className={`${ form.open_on_weekends ? 'active': '' }`}
                  onClick={() => setForm({...form, open_on_weekends: true})}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={`${ !form.open_on_weekends ? 'active': '' }`}
                  onClick={() => setForm({...form, open_on_weekends: false})}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
