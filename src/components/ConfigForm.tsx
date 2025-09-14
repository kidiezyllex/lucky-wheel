"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"

interface WheelConfig {
  items: string[]
  wheelSize: number // Scale factor từ 0.5 đến 2.0
}

interface ConfigFormProps {
  onConfigChange: (config: WheelConfig) => void
  initialConfig?: WheelConfig
}

export default function ConfigForm({ onConfigChange, initialConfig }: ConfigFormProps) {
  const [textInput, setTextInput] = useState("")
  const [wheelSize, setWheelSize] = useState(1.0) // Scale factor từ 0.5 đến 2.0
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (initialConfig) {
      setTextInput(initialConfig.items.join('\n'))
      setWheelSize(initialConfig.wheelSize)
    }
  }, [initialConfig])

  const validateAndProcessInput = (input: string) => {
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
  }

  const handleTextChange = (value: string) => {
    setTextInput(value)
    validateAndProcessInput(value)
  }

  const handleApplyConfig = () => {
    const items = validateAndProcessInput(textInput)
    if (items && isValid) {
      onConfigChange({
        items,
        wheelSize
      })
    }
  }

  const handleWheelSizeChange = (value: number) => {
    setWheelSize(value)
    if (isValid) {
      onConfigChange({
        items: textInput.split('\n').map(line => line.trim()).filter(line => line !== ""),
        wheelSize: value
      })
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full max-w-sm lg:w-[500px] flex-shrink-0">
      <h3 className="text-white text-xl font-semibold mb-6 text-center">Cấu hình Lucky Wheel</h3>
      {/* Text Input Area */}
      <div className="mb-6">
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
            {textInput.split('\n').filter(line => line.trim() !== "").length} / 25 items
          </span>
          {error && (
            <span className="text-red-400 text-xs">{error}</span>
          )}
        </div>
      </div>

      {/* Wheel Size Slider */}
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          Kích thước Wheel: {wheelSize.toFixed(1)}x
        </label>
        <div className="relative">
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={wheelSize}
            onChange={(e) => handleWheelSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #7500FF 0%, #7500FF ${((wheelSize - 0.5) / (2.0 - 0.5)) * 100}%, rgba(255,255,255,0.2) ${((wheelSize - 0.5) / (2.0 - 0.5)) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>0.5x</span>
            <span>2.0x</span>
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
            ? "linear-gradient(135deg, #7500FF 0%, #5A00CC 100%)" 
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
          background: #7500FF;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7500FF;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
