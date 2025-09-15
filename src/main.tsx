import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LuckyWheel1 from './components/LuckyWheel1'
import LuckyWheel2 from './components/LuckyWheel2'
import LuckyWheel3 from './components/LuckyWheel3'
import LuckyWheel4 from './components/LuckyWheel4'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    "Root element not found. Check if it's in your index.html or if the id is correct."
  )
}

function App() {
  const [activeWheel, setActiveWheel] = useState<'wheel1' | 'wheel2' | 'wheel3' | 'wheel4'>('wheel1')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767.98px)')

    const handleChange = () => {
      window.location.reload()
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange)
      } else if (typeof mediaQuery.removeListener === 'function') {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  const renderWheel = () => {
    switch (activeWheel) {
      case 'wheel1':
        return <LuckyWheel1 />
      case 'wheel2':
        return <LuckyWheel2 />
      case 'wheel3':
        return <LuckyWheel3 />
      case 'wheel4':
        return <LuckyWheel4 />
      default:
        return <LuckyWheel1 />
    }
  }

  return (
    <div className='overflow-hidden relative'>
      {renderWheel()}
      
      {/* Navigation Buttons */}
      <div className="fixed left-[10px] bottom-[10px] flex flex-col gap-4 z-50">
        <button
          onClick={() => setActiveWheel('wheel1')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeWheel === 'wheel1'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
          }`}
        >
          Wheel 1
        </button>
        <button
          onClick={() => setActiveWheel('wheel2')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeWheel === 'wheel2'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
          }`}
        >
          Wheel 2
        </button>
        <button
          onClick={() => setActiveWheel('wheel3')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeWheel === 'wheel3'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
          }`}
        >
          Wheel 3
        </button>
        <button
          onClick={() => setActiveWheel('wheel4')}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeWheel === 'wheel4'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
          }`}
        >
          Wheel 4
        </button>
      </div>
    </div>
  )
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
