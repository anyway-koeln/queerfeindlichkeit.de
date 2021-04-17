import React, { useState, memo } from 'react'
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import { IonButton } from '@ionic/react'

import classes from './MapChooser.module.css'

const worldMapDataUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const minZoom = 0.1
const maxZoom = 10

const MapChart = ({ styles, selectedRegion, setRegion }) => {
  const [tooltipContent, setTooltipContent] = useState('')
  const [position, setPosition] = useState({ coordinates: [10.447683, 51.163375], zoom: 2 })

  selectedRegion = !!selectedRegion ? selectedRegion : {}
  function handleZoomIn() {
    if (position.zoom >= maxZoom) {
      return
    }
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  function handleZoomOut() {
    if (position.zoom <= minZoom) {
      return
    }
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  function handleMoveEnd(position) {
    setPosition(position)
  }


  return (
    <>
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{ scale: 1000 }}
        style={styles}
        width={1000}
        height={400}
      >
        <ZoomableGroup
          zoom={position.zoom}
          maxZoom={position.zoom}
          minZoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={worldMapDataUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(geo.properties.NAME) // ISO_A2, ISO_A3
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('')
                  }}
                  onClick={() => {
                    setRegion({
                      ISO_A2: geo.properties.ISO_A2,
                      ISO_A3: geo.properties.ISO_A3,
                      postalCode: null
                    })
                  }}
                  style={{
                    default: {
                      fill: selectedRegion.ISO_A3 === geo.properties.ISO_A3 ? "#E42" : "#e9e7f2",
                      outline: "none",
                      stroke: "#fff",
                      strokeWidth: '1px'
                    },
                    hover: {
                      fill: selectedRegion.ISO_A3 === geo.properties.ISO_A3 ? "#E42" : "#F53",
                      outline: "none",
                      stroke: "#fff",
                      strokeWidth: '1px'
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <ReactTooltip>{tooltipContent}</ReactTooltip>

      <div className={classes.zoom_buttons}>
        <IonButton onClick={handleZoomIn} disabled={position.zoom >= maxZoom}>+</IonButton>
        <IonButton onClick={handleZoomOut} disabled={position.zoom <= minZoom}>–</IonButton>
      </div>
    </>
  )
}

export default memo(MapChart)
