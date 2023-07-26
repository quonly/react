import { useNavigate, useSearchParams } from "react-router-dom"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet"
import { useEffect, useState } from "react"

import styles from "./Map.module.css"
import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeolocation"
import Button from "./Button"
import { useUrlPosition } from "../hooks/useUrlPosition"

const flagemojiToPNG = flag => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
      alt="flag"
    />
  )
}

function Map() {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ])
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation()

  const [lat, lng] = useUrlPosition()

  useEffect(() => {
    if (!lat || !lng) return
    setMapPosition([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if (!geoLocationPosition) return
    setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
  }, [geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      {mapPosition.toString() !=
        [geoLocationPosition?.lat, geoLocationPosition?.lng].toString() && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
            <ChangeCenter position={mapPosition} />
            <DetectClick />
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  if (!position) return
  const map = useMap() // get the current instance of the map
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvent({
    click: e => {
      // console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
}

export default Map
