import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Popup as DefaultPopup } from 'react-leaflet';

export const PageMap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

export const Sidebar = styled.aside`
  width: 440px;
  background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.header``;

export const Title = styled.h1`
  font-weight: 800;
  font-size: 40px;
  line-height: 42px;
  margin-top: 80px;
`;

export const Paragraph = styled.p`
  font-size: 18px;
  line-height: 28px;
  margin-top: 24px;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
`;

export const CreateOrphanage = styled(Link)`
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 64px;
  height: 64px;
  background-color: #15C3D6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: 0.2s;
  z-index: 9999;

  &:hover { 
    background-color: #17D6EB;
  }
`;

export const Popup = styled(DefaultPopup)`
  & .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .leaflet-popup-content-wrapper {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: none;
  }

  & .leaflet-popup-content a {
    background-color: #15c3d6;
    box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .leaflet-popup-tip-container {
    display: none;
  }
`;