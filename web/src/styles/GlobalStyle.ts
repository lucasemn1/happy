import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  & body {
    color: #FFF;
    background: #ebf2f5;
  }

  & body, input, button, textarea {
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 18px;
  }

  & strong {
    font-weight: 900;
  }
`;