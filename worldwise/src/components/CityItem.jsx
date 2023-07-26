import { Link } from "react-router-dom"
import styles from "./CityItem.module.css"
import { useCities } from "../contexts/CitiesContext"

const formatDate = date =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

const flagemojiToPNG = flag => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
      alt="flag"
    />
  )
}
// const flagemojiToPNG = flag => {
//   var countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
//     .map(char => String.fromCharCode(char - 127397).toLowerCase())
//     .join("")
//   return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
// }

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city

  function handleClick(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
