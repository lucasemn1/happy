import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageLanding = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  max-height: 680px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-image: url(${ require('../../assets/img/landing.svg') });
  background-repeat: no-repeat;
  background-position-x: 80%;
  background-position-y: center;
`;

export const Main = styled.main`
  max-width: 350px;
`;

export const Title = styled.h1`
  font-size: 76px;
  font-weight: 900;
  line-height: 70px;
`;

export const Paragraph = styled.p`
  font-size: 24px;
  line-height: 34px;
  margin-top: 40px;
`;

export const Location = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const EnterApp = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80px;
  height: 80px;
  background-color: #ffd665;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover {
    background-color: #96FEFF;
    transition: 0.2s;
  }
`;