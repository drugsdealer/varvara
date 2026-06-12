const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)

// time: number of hours from 13.0 to 17.0 (step 0.5)
export default function Clock({ time }) {
  // Map 24h time to a 12h clock angle. 13:00 -> 1 o'clock -> 30deg, 17:00 -> 5 o'clock -> 150deg
  const hour12 = time % 12
  const angle = (hour12 / 12) * 360

  return (
    <div className="clock">
      <svg viewBox="0 0 200 200" className="clock-face">
        <circle cx="100" cy="100" r="96" className="clock-circle" />
        {HOURS.map((h) => {
          const a = (h / 12) * 2 * Math.PI - Math.PI / 2
          const x = 100 + Math.cos(a) * 80
          const y = 100 + Math.sin(a) * 80
          return (
            <text key={h} x={x} y={y} className="clock-number" textAnchor="middle" dominantBaseline="central">
              {h}
            </text>
          )
        })}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="38"
          className="clock-hand"
          style={{ transform: `rotate(${angle}deg)`, transformOrigin: '100px 100px' }}
        />
        <circle cx="100" cy="100" r="6" className="clock-pin" />
      </svg>
    </div>
  )
}
