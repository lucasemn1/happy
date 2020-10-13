import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
