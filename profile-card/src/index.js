import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./style.css"

function App() {
  return (
    <div className="card">
      <Avatar avatar="avatars/mos.jpg" />
      <div className="data">
        <Intro intro="I'm a full-stack developer." />
        <SkillList
          skills={[
            { skill: "javascrips", emoji: "👍", color: "yellow" },
            { skill: "html", emoji: "👍", color: "red" },
            { skill: "css", emoji: "👍", color: "#00BFFF" },
            { skill: "python", emoji: "👌", color: "#FFD700" },
            { skill: "django", emoji: "😍❤️", color: "green" },
            { skill: "nodejs", emoji: "😍", color: "green" },
            { skill: "php", emoji: "😘", color: "purple" },
            { skill: "mySql", emoji: "❤️", color: "brown" },
            { skill: "google sheet", emoji: "❤️😘", color: "#00FF00" },
          ]}
        />
      </div>
    </div>
  )
}

function Avatar(props) {
  return <img className="avatar" src={props.avatar} />
}

function Intro(props) {
  return (
    <div>
      <h1>Amornthep Luadthai</h1>
      <p>{props.intro}</p>
    </div>
  )
}

function SkillList({ skills }) {
  return (
    <ul className="skill-list">
      {/* <Skill skill="React" emoji="🎉" color="blue" />
      <Skill skill="Javascript" emoji="😍" color="yellow" /> */}
      {skills.map(skill => {
        // return <Skill skill={skill} key={skill.skill} />
        return (
          <li className="skill" style={{ backgroundColor: skill.color }} key={skill.skill}>
            <span>{skill.skill}</span> <span>{skill.emoji}</span>
          </li>
        )
      })}
    </ul>
  )
}

function Skill({ skill }) {
  return (
    <li className="skill" style={{ backgroundColor: skill.color }}>
      <span>{skill.skill}</span> <span>{skill.emoji}</span>
    </li>
  )
}

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
