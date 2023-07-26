import { useState } from "react"
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriend() {
    setShowAddFriend(show => !show)
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false)
  }

  function handleSelection(friend) {
    setSelectedFriend(selected => (selected?.id === friend.id ? null : friend))
    setShowAddFriend(false)
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          onSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  )
}
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id
  return (
    <li className={isSelected ? "selected" : ""} key={friend.id}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)} className="button">
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return

    const id = crypto.randomUUID()
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id: id,
    }
    console.log(newFriend)
    onAddFriend(newFriend)
    setName("")
    setImage("https://i.pravatar.cc/48")
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <span>🧑‍🤝‍🧑 Friend name </span>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <span>📸 Image Url </span>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button className="button">Add</Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState("")
  const [whoIsPaying, setWhoIsPaying] = useState("user")
  const paidByFriend = bill ? bill - paidByUser : ""

  function handleSubmit(e) {
    e.preventDefault()
    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <span>💰 Bill value</span>
      <input
        type="text"
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />

      <span>💸 Your expense</span>
      <input
        type="text"
        value={paidByUser}
        onChange={e =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <span>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</span>
      <input type="text" value={paidByFriend} disabled />

      <span>🤑 Who is paying the bill</span>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button className="button">Select</Button>
    </form>
  )
}
