import { map, tileLayer } from 'leaflet';
import './styles.scss';
import './github.png';

document.addEventListener('DOMContentLoaded', runExample);

function runExample() {
  const mapRef = createMapWithTiles();
}

function createMapWithTiles() {
  const mapRef = map('map', {
    zoom: 12,
    center: [51.7500000, 19.4666700],
  });

  const tilesRef = tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  );

  tilesRef.addTo(mapRef);

  return mapRef;
}
