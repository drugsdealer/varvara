import { useState } from 'react'
import Clock from './components/Clock.jsx'

const FOODS = [
  { id: 'pasta', emoji: '🍝', label: 'Паста' },
  { id: 'rolls', emoji: '🍣', label: 'Роллы' },
  { id: 'burgers', emoji: '🍔', label: 'Бургеры' },
  { id: 'sweet', emoji: '🍰', label: 'Сладкое' },
]

const MIN_TIME = 13
const MAX_TIME = 17

function formatTime(t) {
  const hours = Math.floor(t)
  const minutes = t % 1 === 0 ? '00' : '30'
  return `${hours}:${minutes}`
}

export default function App() {
  const [step, setStep] = useState(1)
  const [answer, setAnswer] = useState('')
  const [food, setFood] = useState('')
  const [time, setTime] = useState(14)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const next = () => setStep((s) => s + 1)

  const handleAnswer = (value) => {
    setAnswer(value)
    next()
  }

  const handleFood = (id) => {
    setFood(id)
  }

  const handleSend = async () => {
    setStatus('sending')
    try {
      const foodLabel = FOODS.find((f) => f.id === food)
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          food: `${foodLabel.emoji} ${foodLabel.label}`,
          time: formatTime(time),
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const foodLabel = FOODS.find((f) => f.id === food)

  return (
    <div className="app">
      <div className="card">
        {step > 1 && step < 5 && (
          <div className="dots">
            {[1, 2, 3].map((d) => (
              <span key={d} className={`dot ${d <= step - 1 ? 'dot-active' : ''}`} />
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="step step-center">
            <div className="emoji-big">💌</div>
            <h1>Ты пойдёшь со мной на свидание?</h1>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => handleAnswer('Да 💖')}>
                Да
              </button>
              <button className="btn btn-primary" onClick={() => handleAnswer('Конечно! 🥰')}>
                Конечно!
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h1>Какое у тебя сегодня настроение на еду?</h1>
            <div className="food-grid">
              {FOODS.map((f) => (
                <button
                  key={f.id}
                  className={`food-box ${food === f.id ? 'food-box-active' : ''}`}
                  onClick={() => handleFood(f.id)}
                >
                  <span className="food-emoji">{f.emoji}</span>
                  <span className="food-label">{f.label}</span>
                </button>
              ))}
            </div>
            <button className="btn btn-primary btn-wide" disabled={!food} onClick={next}>
              Далее
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h1>Во сколько встретимся?</h1>
            <Clock time={time} />
            <div className="time-value">{formatTime(time)}</div>
            <input
              type="range"
              min={MIN_TIME}
              max={MAX_TIME}
              step={0.5}
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>13:00</span>
              <span>17:00</span>
            </div>
            <button className="btn btn-primary btn-wide" onClick={next}>
              Далее
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="step">
            <h1>Всё верно?</h1>
            <div className="summary">
              <div className="summary-row">
                <span className="summary-label">Ответ</span>
                <span className="summary-value">{answer}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Еда</span>
                <span className="summary-value">
                  {foodLabel?.emoji} {foodLabel?.label}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Время</span>
                <span className="summary-value">{formatTime(time)}</span>
              </div>
            </div>

            {status !== 'sent' && (
              <button className="btn btn-primary btn-wide" onClick={handleSend} disabled={status === 'sending'}>
                {status === 'sending' ? 'Отправляю...' : 'Отправить'}
              </button>
            )}
            {status === 'error' && <p className="error-text">Что-то пошло не так, попробуй ещё раз 🥺</p>}
            {status === 'sent' && (
              <div className="step step-center">
                <div className="emoji-big">🎉</div>
                <h1>Готово! Скоро увидимся 💕</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
