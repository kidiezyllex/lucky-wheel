"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "./ui/button"

interface WheelConfig {
  items: string[]
  wheelSize: number
  selectedIndex?: number | null
}

interface ConfigFormProps {
  onConfigChange: (config: WheelConfig) => void
  initialConfig?: WheelConfig
}

export default function ConfigForm({ onConfigChange, initialConfig }: ConfigFormProps) {
  const [textInput, setTextInput] = useState("")
  const [wheelSize, setWheelSize] = useState(1.0)
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [indexInput, setIndexInput] = useState<string>("")

  useEffect(() => {
    if (initialConfig) {
      setTextInput(initialConfig.items.join('\n'))
      setWheelSize(initialConfig.wheelSize)
      if (typeof initialConfig.selectedIndex === 'number') {
        setIndexInput(String(initialConfig.selectedIndex))
      } else {
        setIndexInput("")
      }
    }
  }, [initialConfig])

  const validateAndProcessInput = useCallback((input: string) => {
    const lines = input.split('\n').map(line => line.trim()).filter(line => line !== "")
    
    if (lines.length < 2) {
      setError("Tối thiểu cần 2 items")
      setIsValid(false)
      return null
    }
    
    if (lines.length > 25) {
      setError("Tối đa 25 items")
      setIsValid(false)
      return null
    }
    
    setError("")
    setIsValid(true)
    return lines
  }, [])

  const handleTextChange = useCallback((value: string) => {
    setTextInput(value)
    validateAndProcessInput(value)
  }, [validateAndProcessInput])

  const handleApplyConfig = useCallback(() => {
    const items = validateAndProcessInput(textInput)
    if (items && isValid) {
      const maxIndex = items.length - 1
      const parsedIndex = indexInput.trim() === "" ? null : Number(indexInput)
      const selectedIndex = parsedIndex === null || Number.isNaN(parsedIndex)
        ? null
        : Math.min(Math.max(0, parsedIndex), maxIndex)
      onConfigChange({
        items,
        wheelSize,
        selectedIndex
      })
    }
  }, [textInput, indexInput, wheelSize, isValid, validateAndProcessInput, onConfigChange])

  const handleWheelSizeChange = useCallback((value: number) => {
    setWheelSize(value)
    setTimeout(() => {
      if (isValid) {
        const items = textInput.split('\n').map(line => line.trim()).filter(line => line !== "")
        const maxIndex = items.length - 1
        const parsedIndex = indexInput.trim() === "" ? null : Number(indexInput)
        const selectedIndex = parsedIndex === null || Number.isNaN(parsedIndex)
          ? null
          : Math.min(Math.max(0, parsedIndex), maxIndex)
        onConfigChange({
          items,
          wheelSize: value,
          selectedIndex
        })
      }
    }, 0)
  }, [textInput, indexInput, isValid, onConfigChange])

  const handleIndexChange = useCallback((value: string) => {
    setIndexInput(value)
    setTimeout(() => {
      const items = validateAndProcessInput(textInput)
      if (!items) return
      const trimmed = value.trim()
      if (trimmed === "") {
        onConfigChange({
          items,
          wheelSize,
          selectedIndex: null
        })
        return
      }
      const num = Number(trimmed)
      if (Number.isNaN(num)) return
      const maxIndex = items.length - 1
      if (num < 0 || num > maxIndex) return
      onConfigChange({
        items,
        wheelSize,
        selectedIndex: num
      })
    }, 0)
  }, [textInput, wheelSize, validateAndProcessInput, onConfigChange])

  // 使用 useMemo 优化计算密集的操作
  const maxIndex = useMemo(() => {
    const items = validateAndProcessInput(textInput)
    return items ? items.length - 1 : 0
  }, [textInput, validateAndProcessInput])

  const itemCount = useMemo(() => {
    return textInput.split('\n').filter(line => line.trim() !== "").length
  }, [textInput])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 w-full max-w-sm lg:w-[500px] flex-shrink-0">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">Cấu hình Lucky Wheel</h3>
      {/* Text Input Area */}
      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">
          Danh sách Items (mỗi dòng một item):
        </label>
        <textarea
          value={textInput}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Nhập danh sách items (mỗi dòng một item):&#10;Ví dụ:&#10;100 Points&#10;Free Gift&#10;50% Off&#10;Try Again&#10;Jackpot!"
          className="w-full h-32 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          style={{ fontFamily: 'monospace' }}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-white/70 text-xs">
            {itemCount} / 25 items
          </span>
          {error && (
            <span className="text-red-400 text-xs">{error}</span>
          )}
        </div>
      </div>

      {/* Result Index Input */}
      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">
          Chỉ mục kết quả mong muốn (0 → {maxIndex}):
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={maxIndex}
          step={1}
          value={indexInput}
          onChange={(e) => handleIndexChange(e.target.value)}
          placeholder="Để trống để random"
          className="w-full h-10 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-white/70 text-xs mt-1">Để trống thì kết quả sẽ random như hiện tại.</p>
      </div>

      {/* Wheel Size Slider */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
        <label className="block text-white text-sm font-medium mb-2">
          Kích thước Wheel: {wheelSize.toFixed(1)}x
        </label>
        <div className="relative flex-1">
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={wheelSize}
            onChange={(e) => handleWheelSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #888B91 0%, #888B91 ${((wheelSize - 0.5) / (2.0 - 0.5)) * 100}%, rgba(255,255,255,0.2) ${((wheelSize - 0.5) / (2.0 - 0.5)) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>0.5x</span>
            <span>2.0x</span>
          </div>
        </div>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={handleApplyConfig}
        disabled={!isValid}
        className="w-full text-white font-semibold py-3 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        style={{
          background: isValid 
            ? "linear-gradient(135deg, #888B91 0%, #888B91 100%)" 
            : "linear-gradient(135deg, #666 0%, #444 100%)",
        }}
      >
        Áp dụng cấu hình
      </Button>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #888B91;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #888B91;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        /* Custom Scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
        }

        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          -webkit-border-radius: 0;
          border-radius: 0;
        }

        textarea::-webkit-scrollbar-thumb {
          background: #888B91;
          -webkit-border-radius: 10px;
          border-radius: 10px;
          border: none;
          box-shadow: none;
          background-clip: content-box;
          background-image: linear-gradient(#888B91, #888B91);
          background-size: 8px 30px;
          background-repeat: no-repeat;
          background-position: center;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: #888B91;
        }

        /* Force remove all arrow buttons */
        textarea::-webkit-scrollbar-button {
          width: 0;
          height: 0;
          display: none;
          -webkit-appearance: none;
          appearance: none;
        }

        textarea::-webkit-scrollbar-button:start:decrement,
        textarea::-webkit-scrollbar-button:end:increment {
          width: 0;
          height: 0;
          display: none;
        }

        textarea::-webkit-scrollbar-corner {
          background: transparent;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  )
}
