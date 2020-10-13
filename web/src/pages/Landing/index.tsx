import React from 'react';
import {
  PageLanding,
  ContentWrapper,
  Main,
  Title,
  Paragraph,
  Location,
  EnterApp,
} from './style';
import {
  FiArrowRight
} from 'react-icons/fi';

export default function Landing() {
  return (
    <PageLanding>
      <ContentWrapper>
        <img src={ require('../../assets/img/logo.svg') } alt="Logo Happy"/>

        <Main>
          <Title>Leve felicidade para o mundo</Title>
          <Paragraph>Visite orfanatos e mude o dia de muitas crianças.</Paragraph>
        </Main>

        <Location>
          <strong>Equador</strong>
          <span>Rio Grande do Norte</span>
        </Location>

        <EnterApp to="/app"> 
          <FiArrowRight size="26" color="rgba(0, 0, 0, 0.6)"/>
        </EnterApp>
      </ContentWrapper>
    </PageLanding>
  )
}