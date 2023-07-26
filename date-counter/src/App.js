import { useState } from "react"

const dateNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function App() {
  return (
    <div>
      <DateCounter />
    </div>
  )
}

function DateCounter() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)
  // const [date,setD] = useState(new Date)
  const date = new Date()
  date.setDate(date.getDate() + count)

  function decStep() {
    if (step > 1) setStep(s => s - 1)
  }

  function incStep() {
    setStep(s => s + 1)
  }

  function decCount() {
    if (count - step > 0) {
      setCount(c => c - step)
      // setD((d)=> new Date(d.getFullYear(),d.getMonth(),d.getDate()-step))
    } else {
      setCount(c => (c = 0))
      // setD((d)=> d = new Date())
    }
  }
  function incCount() {
    setCount(c => c + step)
    // setD((d)=> new Date(d.getFullYear(),d.getMonth(),d.getDate()+step))
  }

  function handlerReset() {
    setCount(0)
    setStep(1)
  }
  
  return (
    <div>
      <main>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={e => setStep(+e.target.value)}
        />
        <button onClick={decStep}>-</button>
        Step: {step}
        <button onClick={incStep}>+</button>
        <br />
        <button onClick={decCount}>-</button>
        <input
          type="text"
          value={count}
          onChange={e => setCount(+e.target.value)}
        />
        <button onClick={incCount}>+</button>
      </main>
      {/* <p>{`${count>0 ?  count + ' days from':''}`} Today is {`${dateNames[date.getDay()]} ${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}</p> */}
      <p>
        {`${count > 0 ? count + " days from" : ""}`} Today is{" "}
        {date.toDateString()}{" "}
      </p>
      <article>
        <button onClick={handlerReset}>Reset</button>
      </article>
    </div>
  )
}
