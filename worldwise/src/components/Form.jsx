// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import styles from "./Form.module.css"
import Button from "./Button"
import BackButton from "./BackButton"
import { useUrlPosition } from "../hooks/useUrlPosition"
import Message from "./Message"
import Spinner from "./Spinner"
import { useCities } from "../contexts/CitiesContext"

const BASE_URL = "http://localhost:8000/cities/"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const flagemojiToPNG = flag => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
      alt="flag"
    />
  )
}

function Form() {
  const [lat, lng] = useUrlPosition()
  const { createCity, isLoading } = useCities()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("")
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const [emoji, setEmoji] = useState("")
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
  const [geoCodingError, setGeoCodingError] = useState("")

  useEffect(
    function () {
      if (!lat || !lng) return
      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true)
          setGeoCodingError("")
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          )
          const data = await res.json()
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else"
            )

          setCityName(data.city || data.locality || "")
          setCountry(data.countryName || "")
          setEmoji(data.countryCode.toLowerCase())
        } catch (err) {
          setGeoCodingError(err.message)
        } finally {
          const load = setTimeout(() => setIsLoadingGeoCoding(false), 300)
        }
      }
      fetchCityData()
    },
    [lat, lng]
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    }
    await createCity(newCity)
    navigate(`/app/cities/`)
  }

  if (isLoadingGeoCoding) return <Spinner />

  if (!lat || !lng) return <Message message="Click somewhere on the map" />

  if (geoCodingError) return <Message message={geoCodingError} />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input id="date" onChange={e => setDate(e.target.value)} value={date} /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={d => setDate(d)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
