import { useState } from "react"
import "./index.css"

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
]

export default function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  )
}

function Accordion({ faqs }) {
  const [curOpen, setCurOpen] = useState(null)

  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordianItem
          num={index}
          title={item.title}
          text={item.text}
          key={index}
          onOpen={setCurOpen}
          curOpen={curOpen}
        />
      ))}
    </div>
  )
}

function AccordianItem({ num, title, text, curOpen, onOpen }) {
  const isOpen = num === curOpen

  function handleToggle(){
    onOpen(isOpen ? null : num)
  }

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <span className="number">{(num + 1).toString().padStart(2, "0")}</span>{" "}
      <h2 className="title">{title}</h2>
      <span className="icon">{isOpen ? "-" : "+"}</span>
      {isOpen && (
        <div className="content-box">
          <ul>{text}</ul>
        </div>
      )}
    </div>
  )
}
