import React, { useState, useCallback, memo } from 'react'
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

const MapChart = ({ styles, selectedRegion, setRegion }) => {
  const [tooltipContent, setTooltipContent] = useState('')
  const [zoom, setZoom] = useState(2)

  selectedRegion = !!selectedRegion ? selectedRegion : {}

  const zoomIn = useCallback(() => {
    setZoom(zoom + 1)
  }, [zoom, setZoom])

  const zoomOut = useCallback(() => {
    setZoom(zoom - 1)
  }, [zoom, setZoom])

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
        <ZoomableGroup zoom={zoom} maxZoom={zoom} minZoom={zoom} center={[10.447683, 51.163375]}>
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
        <IonButton onClick={zoomIn} disabled={zoom >= 10}>+</IonButton>
        <IonButton onClick={zoomOut} disabled={zoom <= 1}>–</IonButton>
      </div>
    </>
  )
}

export default memo(MapChart)
