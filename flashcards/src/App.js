import { useState } from "react"
import "./index.css"

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  )
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
]

// My solution
// function FlashCards() {
//   return (
//     <div className="flashcards">
//       {questions.map(item => (
//         <Card item={item} key={item.id} />
//       ))}
//     </div>
//   )
// }

// function Card({ item }) {
//   const [select, setSelect] = useState(false)

//   function handleSelect() {
//     setSelect(s => !s)
//   }

//   return (
//     <div onClick={handleSelect} className={select ? "selected" : ""}>
//       {select ? item.answer : item.question}
//     </div>
//   )
// }

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null)

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null)
  }

  return (
    <div className="flashcards">
      {questions.map(question => (
        <div
        // ใช้ arrow function ภายใน onClick ก็เพราะว่าเราต้องการใส่ค่าเข้าไปในฟังก์ชั่น handleClick ซึ่งหากเราเรียกฟังก์ชั่นนั้นโดยตรงใน onClick มันจะถูกเรียกทันทีที่มีการเรนเดอร์ เราจึงใช้วิธีการใช้ arrow function แล้วใช้ handleClick เป็น callback function แล้ว handlerClick ก็จะทำงานแค่ตอนคลิกเท่านั้น
          onClick={()=>handleClick(question.id)}
          key={question.id}
          className={question.id === selectedId ? "selected" : ""}
        >
          <p>
            {question.id === selectedId ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  )
}
