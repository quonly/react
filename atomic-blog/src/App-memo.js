import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { faker } from "@faker-js/faker"

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  }
}

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [isFakeDark, setIsFakeDark] = useState(false)

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter(post =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts

  // when this component re-render this function also re-created. so we need to use useCallback hook to make this function stable over time. useCallback hook takes in a callback function, which will be called on the initial render. And the return value of that callback function will be the value that is memoized. So we can actually just return this function right here. And now, this function will be stable over time. It will not be recreated on every render. It will only be recreated when the value of the `posts` dependency changes. And we need to pass in that dependency array as the second argument to `useCallback`. which will basically tell React when to recompute this memoized value.
  // We don't pass dependency array because we don't have any dependencies. We don't have any dependencies because we're not using any state or props inside of this function. So we don't need to pass in any dependencies. And that's why we can use `useCallback` instead of `useMemo` here. Because `useMemo` requires a dependency array. And `useCallback` doesn't require a dependency array. So if you don't have any dependencies, you can use `useCallback` instead of `useMemo`.
  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts(posts => [post, ...posts])
  }, [])

  function handleClearPosts() {
    setPosts([])
  }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode")
    },
    [isFakeDark]
  )

  // this object right here is recreated over and over again each time that the app component re-renders. wee need to do is to make this object here stable over time. useMemo hook
  // useMemo actually takes in a callback function, which will be called on the initial render. And the return value of that callback function will be the value that is memoized. So we can actually just return this object right here. And now, this object will be stable over time. It will not be recreated on every render. It will only be recreated when the value of the `archiveOptions` dependency changes. And we need to pass in that dependency array as the second argument to `useMemo`. which will basically tell React when to recompute this memoized value.
  // what is stale state? stale state is when you have a value that is derived from some other value. And that other value changes, but the derived value doesn't change. So it's stale. It's not up to date. And that's what we're doing here. We're deriving this value from the `posts` array. And if the `posts` array changes, we want to recompute this value. But if the `posts` array doesn't change, we don't want to recompute this value. We want to keep it the same. And that's what `useMemo` does. It will only recompute this value when the `posts` array changes. Otherwise, it will just return the same value that it returned on the previous render.
  const archiveOptions = useMemo(() => {
    return {
      show: false,
      title: `Post archive in addition to ${posts.length} main hook`,
    }
  }, [posts.length])

  return (
    <section>
      <button
        onClick={() => setIsFakeDark(isFakeDark => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Main posts={searchedPosts} onAddPost={handleAddPost} />
      <Archive
        archiveOptions={archiveOptions}
        onAddPost={handleAddPost}
        setIsFakeDark={setIsFakeDark}
      />
      <Footer />
    </section>
  )
}

function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPosts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  )
}

function SearchPosts({ searchQuery, setSearchQuery }) {
  return (
    <input
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  )
}

function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>
}

function Main({ posts, onAddPost }) {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  )
}

function Posts({ posts }) {
  return (
    <section>
      <List posts={posts} />
    </section>
  )
}

function FormAddPost({ onAddPost }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const handleSubmit = function (e) {
    e.preventDefault()
    if (!body || !title) return
    onAddPost({ title, body })
    setTitle("")
    setBody("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  )
}

function List({ posts }) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}

const Archive = memo(function Archive({ archiveOptions, onAddPost }) {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  )

  const [showArchive, setShowArchive] = useState(archiveOptions.show)

  return (
    <aside>
      <h2>{archiveOptions.title}</h2>
      <button onClick={() => setShowArchive(s => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
})

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>
}

export default App
