import React from "react";
import mapMarkerImg from '../../assets/img/map-marker.svg';
import {FiArrowLeft} from 'react-icons/fi';
import { useHistory } from "react-router-dom";
import {
  Aside,
  Button,
} from './style';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <Aside>
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <Button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </Button>
      </footer>
    </Aside>
  );
}
