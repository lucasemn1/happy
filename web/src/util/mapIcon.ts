import Leftlet from 'leaflet';
export const mapMarker = require('../assets/img/map-marker.svg');

export default Leftlet.icon({
  iconUrl: mapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});
