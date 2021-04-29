import { useState, useEffect, useCallback } from 'react'

import { IonButton } from '@ionic/react'

import { MapContainer, TileLayer, Circle, Rectangle, useMapEvent, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { OpenStreetMapProvider } from 'leaflet-geosearch'

import classes from './GeoInput.module.css'
import './GeoInputLeaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

function MapScale() {
  const map = useMap()

  useEffect(() => {
    window.L.control.scale().addTo(map)
  }, [map])

  return null
}

function MapSearch({ map, onChange }) {
  const [typingTimeout, setTypingTimeout] = useState()

  const [provider, setProvider] = useState()

  useEffect(() => {
    setProvider(new OpenStreetMapProvider({ // TODO: Add more providers as a backup. And propably proxy through our api server.
      params: {
        email: 'tech@queerfeindlichkeit.de', // auth for large number of requests
      },
    }))
  }, [setProvider])

  const handleChange = useCallback(event => {
    clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>{
      if (!!provider && !!map) {
        provider.search({ query: event.target.value })
          .then(function (result) {
            if (result.length > 0) {
              map.fitBounds(result[0].bounds)
              // map.setView({ lng: result[0].x, lat: result[0].y })
            }
          })
      }
    }, 500))
  }, [typingTimeout, setTypingTimeout, provider, map])

  return <input
    className={classes.searchInput}
    type="text"
    onChange={handleChange}
    placeholder="Search…"
  />
}

function MapZoom({ map }) {
  const handleZoomIn = useCallback(event => {
    if (!!map) {
      map.zoomIn(1)
    }
  }, [map])

  const handleZoomOut = useCallback(event => {
    if (!!map) {
      map.zoomOut(1)
    }
  }, [map])

  return <div className={classes.zoomButtonsWrapper}>
    <IonButton className={classes.zoomButton} onClick={handleZoomIn}>+</IonButton>
    <IonButton className={classes.zoomButton} onClick={handleZoomOut}>-</IonButton>
  </div>
}

function MapEventHandler({ onMap, onClick }) {
  const map = useMap()

  useEffect(() => {
    onMap(map)
  }, [onMap, map])

  useMapEvent('click', onClick)

  return null
}

const geoPrecision = 100
const geoShift = 0.5 / geoPrecision

function useRectangle({ lat, lng }) {
  return [
    [lat - geoShift, lng - geoShift],
    [lat + geoShift, lng + geoShift],
  ]
}

function GeoInput({ onChange, defaultValue }) {
  const [map, setMap] = useState()

  const defaultValueLatLng = (defaultValue || '').split(',').map(value => parseFloat(value))

  const [markerPos, setMarkerPos] = useState({ lat: defaultValueLatLng[0] || 0, lng: defaultValueLatLng[1] || 0 })
  const [preciseMarkerPos, setPreciseMarkerPos] = useState(markerPos)
  const rectangle = useRectangle(markerPos)

  useEffect(() => {
    const L = window.L

    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl
    })
  }, [])

  const handleMapClick = useCallback((event) => {
    // if (event.originalEvent.target.classList.contains('leaflet-container')) { // check if event is coming from the map
      let { lat, lng } = event.latlng

      let roundedLat = Math.round(lat * geoPrecision) / geoPrecision
      let roundedLng = Math.round(lng * geoPrecision) / geoPrecision

      if (roundedLat === markerPos.lat && roundedLng === markerPos.lng) {
        roundedLat = 0
        roundedLng = 0
        lat = 0
        lng = 0
      }

      setPreciseMarkerPos({ lat, lng })
      setMarkerPos({ lat: roundedLat, lng: roundedLng })

      if (roundedLat === 0 && roundedLng === 0) {
        onChange(null)
      } else {
        onChange(`${roundedLat}, ${roundedLng}`)
      }
    // }
  }, [markerPos, setPreciseMarkerPos, setMarkerPos, onChange])

  const handleMap = useCallback((newMap) => {
    setMap(newMap)
  }, [setMap])

  return <div className={classes.mapWrapper}>
    <MapSearch map={map} />
    <MapZoom map={map} />
    <MapContainer
      className={classes.map}
      center={[51.2964955, 9.9019876]}
      zoom={5.5}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      {/* <TileLayer
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {/* <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors | © <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      /> */}
      {/* <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
        url="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        subdomains="ab"
        maxZoom={19}
      /> */}
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a> <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">© Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/qiekub/cko1ikam20wgq18p9wd200uy0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicWlla3ViIiwiYSI6ImNrbzFpY3NtZjA4dXQyb3M1OGU5czNqZzYifQ.UFFb9Vh5VldqZzdjempXPQ"
      />

      {
        preciseMarkerPos.lat !== markerPos.lat && preciseMarkerPos.lng !== markerPos.lng
        ? <Circle center={preciseMarkerPos} radius={5} pathOptions={{ fillOpacity: 1, color: 'var(--primary-dark, black)' }} />
        : null
      }
      {
        markerPos.lat !== 0 && markerPos.lng !== 0
        ? <Rectangle bounds={rectangle} pathOptions={{ fillColor: 'var(--primary, black)', color: 'var(--primary-dark, black)', fillOpacity: 0.3, weight: 5, lineCap: 'square', lineJoin: 'square' }} />
        : null
      }
      <MapEventHandler onMap={handleMap} onClick={handleMapClick} />
      <MapScale />
    </MapContainer>
  </div>
}

export default GeoInput
