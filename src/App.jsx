import { useMemo, useState } from 'react'
import './App.css'

const initialTasks = [
  { id: '1', text: 'Review project brief', done: true },
  { id: '2', text: 'Sketch the one-page layout', done: true },
  { id: '3', text: 'Ship the mini React build', done: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [draft, setDraft] = useState('')

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((t) => t.done).length
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [tasks])

  function addTask(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false },
    ])
    setDraft('')
  }

  function toggle(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function remove(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="page">
      <header className="top">
        <div className="brand">
          <span className="mark" aria-hidden />
          <span className="name">Team Cloud</span>
        </div>
        <p className="tagline">A single-page React workspace</p>
      </header>

      <main className="main">
        <section className="panel hero">
          <h1>Plan today in one screen</h1>
          <p className="lede">
            Capture tasks, track progress, and keep everything in the browser.
            No routing—just one focused page built with React state.
          </p>
          <div className="stats" role="status" aria-live="polite">
            <div className="stat">
              <span className="stat-value">{stats.done}</span>
              <span className="stat-label">Done</span>
            </div>
            <div className="stat">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat wide">
              <span className="stat-value">{stats.pct}%</span>
              <span className="stat-label">Complete</span>
              <div
                className="progress"
                style={{ '--p': `${stats.pct}%` }}
                aria-hidden
              />
            </div>
          </div>
        </section>

        <section className="panel tasks" aria-labelledby="tasks-heading">
          <h2 id="tasks-heading">Tasks</h2>
          <form className="composer" onSubmit={addTask}>
            <label htmlFor="task-input" className="sr-only">
              New task
            </label>
            <input
              id="task-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a task and press Enter…"
              autoComplete="off"
            />
            <button type="submit">Add</button>
          </form>

          <ul className="task-list">
            {tasks.map((t) => (
              <li key={t.id} className={t.done ? 'task done' : 'task'}>
                <label className="task-row">
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggle(t.id)}
                  />
                  <span className="task-text">{t.text}</span>
                </label>
                <button
                  type="button"
                  className="delete"
                  onClick={() => remove(t.id)}
                  aria-label={`Remove ${t.text}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="foot">
        <span>React + Vite · {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

export default App
