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
        const finalSectorStart = (sectorStartAngle + finalAngle) % 360
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
      <div className="flex flex-col lg:grid lg:grid-cols-2 items-center justify-center gap-4 lg:gap-8 px-4 lg:px-8 py-4">
        <div className="flex justify-center items-center order-1 lg:order-1">
          <div 
            className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center"
            style={{
              transform: `scale(${config.wheelSize})`,
              transformOrigin: "center center",
            }}
          >
            <img 
              src="/images/wheel2.webp" 
              alt="Lucky Wheel" 
              className="absolute select-none w-80 h-80 sm:w-96 sm:h-96 object-contain bg-transparent z-0" 
              draggable={false}
            />
            <div className="relative w-[200px] h-[200px] sm:w-[330px] sm:h-[330px] z-10">
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

                  const colors = ["#FEE010", "#FFB411", "#D22620", "#FDD2E1"]
                  
                  let colorIndex = index % 4
                  
                  if (itemCount > 1) {
                    const prevIndex = (index - 1 + itemCount) % itemCount
                    const nextIndex = (index + 1) % itemCount
                    const prevColorIndex = prevIndex % 4
                    const nextColorIndex = nextIndex % 4
    
                    if (colorIndex === prevColorIndex || colorIndex === nextColorIndex) {
                      for (let i = 0; i < 4; i++) {
                        if (i !== prevColorIndex && i !== nextColorIndex) {
                          colorIndex = i
                          break
                        }
                      }
                    }
                  }

                  return (
                    <path
                      key={`sector-${index}`}
                      d={createSectorPath(startAngle, endAngle, radius)}
                      fill={colors[colorIndex]}
                      stroke="#FCDEE7"
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
                  
                  const formatTextForDisplay = (text: string) => {
                    if (!text) return ""
                    
                    if (itemCount >= 9 && itemCount <= 25) {
                      const words = text.split(/\s+/).filter(word => word.length > 0)
                      return words.slice(0, 4).join(" ")
                    }
                    const words = text.split(/\s+/).filter(word => word.length > 0)
                    
                    if (words.length <= 4) {
                      return text
                    }
                    
                    const firstLine = words.slice(0, 4).join(" ")
                    const remainingWords = words.slice(4)
                    
                    if (remainingWords.length <= 4) {
                      return firstLine + "\n" + remainingWords.join(" ")
                    } else {
                      const secondLine = remainingWords.slice(0, 4).join(" ") + "..."
                      return firstLine + "\n" + secondLine
                    }
                  }
                  
                  const displayText = formatTextForDisplay(originalText)

                  return (
                    <g
                      key={`text-group-${index}`}
                      transform={`rotate(${textRotation}, ${textPosition.x}, ${textPosition.y})`}
                    >
                      <text
                        x={textPosition.x}
                        y={textPosition.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-black font-bold text-xs sm:text-sm pointer-events-none select-none"
                        style={{
                          fontSize: window.innerWidth < 640 ? '10px' : '12px',
                          textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
                          fill: 'black'
                        }}
                      >
                        {displayText.split('\n').map((line, lineIndex) => (
                          <tspan
                            key={lineIndex}
                            x={textPosition.x}
                            dy={lineIndex === 0 ? 0 : '1.2em'}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Arrow Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 transition-all duration-200 ${isSpinning
                ? "scale-95 cursor-not-allowed pointer-events-none"
                : "hover:scale-110 active:scale-95 cursor-pointer"
                }`}
              style={{ zIndex: 10 }}
            >
              <img
                draggable={false}
                src="/images/arrow2.webp"
                alt="Spin Arrow"
                className={`w-full h-full select-none object-contain drop-shadow-lg transition-all duration-200 -translate-y-1 sm:-translate-y-2`}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center order-2 lg:order-2 w-full max-w-md mx-auto">
          <ConfigForm
            onConfigChange={handleConfigChange}
            initialConfig={config}
          />
        </div>
      </div>
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-xs sm:max-w-sm p-0 border-0 bg-transparent mx-4">
          <div className="relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-2 sm:w-2 sm:h-4 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    backgroundColor: i % 2 === 0 ? "#D22620" : "#FEE010",
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Result Card */}
            <div
              className="rounded-2xl sm:rounded-3xl p-4 text-center shadow-2xl border border-purple-400/30"
              style={{ background: "linear-gradient(135deg, #D22620 0%, #FFB411 50%, #FEE010 100%)" }}
            >
              <div className="mb-3 sm:mb-4">
                <h3 className="text-black text-lg sm:text-xl font-semibold uppercase tracking-wider mb-2">Your Result</h3>
                <div
                  className="w-full z-50 bg-white mx-auto rounded-lg flex items-center justify-center shadow-lg"
                >
                  <div
                    className="text-white font-bold text-sm sm:text-lg text-center px-1 sm:px-2 leading-tight py-1"
                    style={{ color: "#D22620", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                  >
                    {result}
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-black text-base sm:text-lg font-semibold uppercase tracking-wide mb-2">Congratulations!</h4>
                <p className="text-black text-xs sm:text-sm leading-relaxed px-2">
                  You've won this amazing prize! Good luck and enjoy your reward.
                </p>
              </div>

              <Button
                onClick={closeResult}
                className="w-full text-white font-semibold py-2 sm:py-3 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 border-0 text-sm sm:text-base"
                style={{
                  background: "linear-gradient(135deg, #FEE010 0%, #FFB411 100%)",
                  color: "#D22620",
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
