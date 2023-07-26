import { useState } from "react"

function App() {
  // 1. get the Bill value
  // 2. get the Service value (tip percentage)
  // 3. calculate the tip
  // 4. display the tip

  // Create all state variable

  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(0)

  function handleBill(event) {
    console.log(event.target.value)
    setBill(+event.target.value)
  }

  function handleReset() {
    setBill(0)
    setTip(0)
    console.log(bill)
  }

  function handleTotalTip(num) {
    setTip(tip=>tip+(num))
  }

  function calTip() {
    return Math.ceil(bill*((tip/2)/100))
  }
  
  return (
    <div className="App">
      <h1>Tip Calculator</h1>
      <Bill onBillChange={handleBill} bill={bill} />
      <Tip onChangeTip={handleTotalTip} tip={tip}>How did you like the service?</Tip>
      <Tip onChangeTip={handleTotalTip} tip={tip}>How did your friend like the service?</Tip>
      {bill > 0 && (
        <>
          <Pay bill={bill} tip={calTip()} />
          <ResetButton onReset={handleReset} />
        </>
      )}
    </div>
  )
}

function Bill({ onBillChange, bill }) {
  return (
    <div className="Bill">
      <label htmlFor="bill">How much was the bill?</label>
      <input
        type="number"
        placeholder="Bill"
        onChange={event => onBillChange(event)}
        value={bill > 0 ? bill : ""}
      />
    </div>
  )
}

function Tip({ children, onChangeTip , tip}) {
  const [curTip, setCurTip] = useState(0)
  function handleTip(event) {
    onChangeTip(-curTip)
    setCurTip(+event.target.value)
    onChangeTip(+event.target.value)
  }
  
  return (
    <div className="Service">
      <span>{children}</span>
      <select value={!tip ? tip : curTip} onChange={handleTip}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

function Pay({ bill, tip }) {
  return (
    <h1>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h1>
  )
}

function ResetButton({ onReset }) {
  return <button onClick={onReset}>Reset</button>
}

export default App
