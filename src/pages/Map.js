import React from 'react'

// import { useParams } from 'react-router-dom'

// import '../../node_modules/leaflet/dist/leaflet.js'
import '../../node_modules/leaflet/dist/leaflet.css'
import { Map, TileLayer } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'

import { addressPoints } from '../../node_modules/react-leaflet-heatmap-layer/example/realworld.10000.js'

// import useStory from '../hooks/useStory.js'
import classes from './Map.module.css'

const position = [51.163375, 10.447683]

/*
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
*/

function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

function QueerfeindlichkeitMap() {
  // const { id } = useParams()
  // const [story] = useStory(id)

  // if (!(!!story)) {
  //   return null
  // }

  return (
    <>
      <Map
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        placeholder={<MapPlaceholder />}
        className={classes.mapContainer}
      >
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={addressPoints}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])}
          gradient={{
            '0.1': '#D65C85',
            '1.0': '#D65C85'
          }}
          radius={25}
          blur={50}
          max={0.5}
          opacity={1}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </>
  )
}

export default QueerfeindlichkeitMap
