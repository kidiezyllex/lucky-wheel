"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"

interface WheelConfigIcon {
  wheelSize: number 
}

interface ConfigFormIconProps {
  onConfigChange: (config: WheelConfigIcon) => void
  initialConfig?: WheelConfigIcon
}

export default function ConfigFormIcon({ onConfigChange, initialConfig }: ConfigFormIconProps) {
  const [wheelSize, setWheelSize] = useState(1.0) 

  useEffect(() => {
    if (initialConfig) {
      setWheelSize(initialConfig.wheelSize)
    }
  }, [initialConfig])

  const handleWheelSizeChange = (value: number) => {
    setWheelSize(value)
    onConfigChange({
      wheelSize: value
    })
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 w-full max-w-sm lg:w-[500px] flex-shrink-0">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">Cấu hình Lucky Wheel</h3>
      
      {/* Wheel Size Slider */}
      <div className="mb-4">
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
              background: `linear-gradient(to right, #888B91 0%, #888B91 ${((wheelSize - 0.5) / (2.0 - 0.5)) * 100}%, rgba(255,255,255,0.2) ${((wheelSize - 0.5) / (2.0 - 0.5)) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>0.5x</span>
            <span>2.0x</span>
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  )
}
