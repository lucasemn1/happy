import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/app" component={OrphanagesMap}/>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
