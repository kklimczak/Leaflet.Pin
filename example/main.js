import { map, tileLayer } from 'leaflet'
import './styles.scss'
import './github.png'
import data from './data.json'

document.addEventListener('DOMContentLoaded', runExample)

function runExample() {
    const mapRef = createMapWithTiles()

    console.log(data)
}

function createMapWithTiles() {
    const mapRef = map('map', {
        zoom: 12,
        center: [51.75, 19.46667],
    })

    const tilesRef = tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    )

    tilesRef.addTo(mapRef)

    return mapRef
}
