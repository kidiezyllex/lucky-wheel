"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import ConfigForm from "../ConfigForm"

interface WheelConfig {
  items: string[]
  wheelSize: number 
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

export default function LuckyWheelText() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState("")
  const [spinDuration, setSpinDuration] = useState(5000)
  const [config, setConfig] = useState<WheelConfig>({
    items: [],
    wheelSize: 1.0 
  })

  const wheelItems = config.items
  const itemCount = wheelItems.length
  const anglePerItem = itemCount > 0 ? 360 / itemCount : 0

  const handleSpin = () => {
    if (isSpinning || itemCount === 0) return

    setIsSpinning(true)

    const baseRotation = 1800 + Math.random() * 1800

    const validItems = wheelItems.filter(item => item && item.trim() !== "")
    const randomIndex = Math.floor(Math.random() * validItems.length)
    const selectedItem = validItems[randomIndex] || "Default Item"

    const actualIndex = wheelItems.findIndex(item => item === selectedItem)

    const finalRotation = 360 - (actualIndex * anglePerItem)
    const totalRotation = rotation + baseRotation + finalRotation

    setResult(selectedItem)

    setRotation(0)
    setTimeout(() => {
      setRotation(totalRotation)
    }, 10)

    const newSpinDuration = 5000 + Math.random() * 1000 
    setSpinDuration(newSpinDuration)

    setTimeout(() => {
      setIsSpinning(false)

      const finalAngle = totalRotation % 360

      let highestSector = { index: 0, maxStartAngle: -Infinity }

      Array.from({ length: itemCount }).forEach((_, index) => {
        const sectorStartAngle = index * anglePerItem
        const sectorEndAngle = (index + 1) * anglePerItem
        
        const finalSectorStart = (sectorStartAngle + finalAngle) % 360
        const finalSectorEnd = (sectorEndAngle + finalAngle) % 360
        
        const radius = 160
        
        const startAngle = finalSectorStart
        if (startAngle > highestSector.maxStartAngle) {
          highestSector = { index, maxStartAngle: startAngle }
        }
      })

      const actualResult = wheelItems[highestSector.index]
      setResult(actualResult || "")
      setShowResult(true)
    }, newSpinDuration)
  }

  const closeResult = () => {
    setShowResult(false)
  }

  const handleConfigChange = (newConfig: WheelConfig) => {
    setConfig(newConfig)
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:flex-row items-center justify-center min-h-80vh gap-8 px-4 lg:px-8">
        <div className="flex justify-center items-center">
          <div 
            className="relative w-96 h-96 flex items-center justify-center"
            style={{
              transform: `scale(${config.wheelSize})`,
              transformOrigin: "center center",
            }}
          >
            <img src="/images/wheel1.png" alt="Lucky Wheel" className="absolute w-96 h-96 object-contain bg-transparent z-0" draggable={false} />
            <div className="relative w-[310px] h-[310px] z-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 320 320"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "center center",
                  transition: isSpinning ? `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` : "none",
                }}
              >
                {/* Background sectors */}
                {Array.from({ length: itemCount }).map((_, index) => {
                  const startAngle = index * anglePerItem
                  const endAngle = (index + 1) * anglePerItem
                  const radius = 160

                  // Tạo path cho sector
                  const createSectorPath = (startAngle: number, endAngle: number, radius: number) => {
                    const start = polarToCartesian(160, 160, radius, endAngle)
                    const end = polarToCartesian(160, 160, radius, startAngle)
                    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

                    return [
                      "M", 160, 160,
                      "L", start.x, start.y,
                      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                      "Z"
                    ].join(" ")
                  }

                  return (
                    <path
                      key={`sector-${index}`}
                      d={createSectorPath(startAngle, endAngle, radius)}
                      fill={index % 2 === 0 ? "#FFCC5A" : "#7500FF"}
                      stroke="#3604B7"
                      strokeWidth="1"
                      className="pointer-events-none"
                    />
                  )
                })}

                {/* Text labels */}
                {Array.from({ length: itemCount }).map((_, index) => {
                  const angle = index * anglePerItem + anglePerItem / 2
                  const radius = 100
                  const textPosition = polarToCartesian(160, 160, radius, angle)

                  let textRotation = angle - 90

                  if (angle > 90 && angle < 270) {
                    textRotation = angle + 90
                  }

                  const originalText = wheelItems[index] || ""
                  const displayText = originalText.length > 19
                    ? originalText.substring(0, 16) + "..."
                    : originalText


                  return (
                    <text
                      key={`text-${index}`}
                      x={textPosition.x}
                      y={textPosition.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-white font-bold text-sm pointer-events-none select-none"
                      style={{
                        fontSize: '11px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        fill: 'white'
                      }}
                      transform={`rotate(${textRotation}, ${textPosition.x}, ${textPosition.y})`}
                    >
                      {displayText}
                    </text>
                  )
                })}
              </svg>
            </div>

            {/* Arrow Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 transition-all duration-200 ${isSpinning
                ? "scale-95 opacity-50 cursor-not-allowed pointer-events-none"
                : "hover:scale-110 active:scale-95 cursor-pointer"
                }`}
              style={{ zIndex: 10 }}
            >
              <img
                draggable={false}
                src="/images/arrow1.png"
                alt="Spin Arrow"
                className={`w-full h-full object-contain drop-shadow-lg transition-all duration-200 -translate-y-2 ${isSpinning ? "animate-pulse" : ""
                  }`}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ConfigForm
            onConfigChange={handleConfigChange}
            initialConfig={config}
          />
        </div>
      </div>
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-sm p-0 border-0 bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-4 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    backgroundColor: i % 2 === 0 ? "#7500FF" : "#FFCC59",
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Result Card */}
            <div
              className="rounded-3xl p-6 text-center shadow-2xl border border-purple-400/30"
              style={{ background: "linear-gradient(135deg, #7500FF 0%, #5A00CC 50%, #7500FF 100%)" }}
            >
              <div className="mb-4">
                <h3 className="text-white text-xl font-semibold uppercase tracking-wider mb-2">Your Result</h3>
                <div
                  className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #FFCC59 0%, #FFB800 50%, #FFCC59 100%)" }}
                >
                  <div
                    className="text-white font-bold text-lg text-center px-2 leading-tight"
                    style={{ color: "#7500FF", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                  >
                    {result}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white text-lg font-semibold uppercase tracking-wide mb-2">Congratulations!</h4>
                <p className="text-purple-100 text-sm leading-relaxed">
                  You've won this amazing prize! Good luck and enjoy your reward.
                </p>
              </div>

              <Button
                onClick={closeResult}
                className="w-full text-white font-semibold py-3 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 border-0"
                style={{
                  background: "linear-gradient(135deg, #FFCC59 0%, #FFB800 100%)",
                  color: "#7500FF",
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
