"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import ConfigFormIcon from "../ConfigFormIcon"

const iconItems = [
  "/icons/icon1.webp",
  "/icons/icon2.webp",
  "/icons/icon3.webp",
  "/icons/icon4.webp",
  "/icons/icon5.webp",
  "/icons/icon6.webp",
  "/icons/icon7.webp",
  "/icons/icon8.webp",
]

interface WheelConfigIcon {
  wheelSize: number
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

export default function LuckyWheelIcon() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState("")
  const [spinDuration, setSpinDuration] = useState(5000)
  const [config, setConfig] = useState<WheelConfigIcon>({
    wheelSize: 1.0
  })

  const wheelItems = iconItems.slice(0, 8).concat(Array(Math.max(0, 8 - iconItems.length)).fill(""))

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)

    const baseRotation = 1800 + Math.random() * 1800 
    
    const validItems = wheelItems.filter(item => item && item.trim() !== "")
    const randomIndex = Math.floor(Math.random() * validItems.length)
    const selectedItem = validItems[randomIndex] || "Default Item"
    
    const actualIndex = wheelItems.findIndex(item => item === selectedItem)
    
    const finalRotation = 360 - (actualIndex * 45)
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
      
      Array.from({ length: 8 }).forEach((_, index) => {
        const sectorStartAngle = index * 45
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

  const handleConfigChange = (newConfig: WheelConfigIcon) => {
    setConfig(newConfig)
  }

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-2 items-center justify-center gap-4 lg:gap-8 px-4 lg:px-8 py-2">
        <div className="flex justify-center items-center order-1 lg:order-1">
          <div 
            className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center"
            style={{
              transform: `scale(${config.wheelSize})`,
              transformOrigin: "center center",
            }}
          >
            <img 
              src="/images/wheel4.webp" 
              alt="Lucky Wheel" 
              className="absolute w-80 h-80 sm:w-96 sm:h-96 object-contain bg-transparent z-0 select-none" 
              draggable={false}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: window.innerWidth < 640 ? "-160px" : "-192px",
                marginTop: window.innerWidth < 640 ? "-160px" : "-192px",
              }}
            />
            <div className="relative w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] z-10">
              <svg
                className="w-full h-full absolute"
                viewBox="0 0 320 320"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "center center",
                  transition: isSpinning ? `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` : "none",
                }}
              >
                {/* Background sectors */}
                {Array.from({ length: 8 }).map((_, index) => {
                  const startAngle = index * 45
                  const endAngle = (index + 1) * 45
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

                  const colors = ["#B366FF", "#FFCC5A", "#7500FF", "#FFB800"]
                  const colorIndex = index % 4

                  return (
                    <path
                      key={`sector-${index}`}
                      d={createSectorPath(startAngle, endAngle, radius)}
                      fill={colors[colorIndex]}
                      stroke="#3604B7"
                      strokeWidth="1"
                      className="pointer-events-none"
                    />
                  )
                })}
              </svg>
              
              <div
                className="w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "center center",
                  transition: isSpinning ? `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` : "none",
                }}
              >
                {Array.from({ length: 8 }).map((_, index) => {
                  const angle = index * 45 + 22.5 // 22.5度是45度的一半，让图标位于扇形中心
                  const radius = 100 // 调整半径，让图标更靠近中心
                  
                  const iconPosition = polarToCartesian(160, 160, radius, angle)
                  
                  return (
                    <div
                      key={`icon-${index}`}
                      className="absolute pointer-events-none flex items-center justify-center"
                      style={{
                        left: `${iconPosition.x}px`,
                        top: `${iconPosition.y}px`,
                        width: "32px",
                        height: "32px",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <img 
                        src={wheelItems[index]} 
                        alt="Icon" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  )
                })}
              </div>
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
                src="/images/arrow4.webp"
                alt="Spin Arrow"
                className={`w-full h-full select-none object-contain drop-shadow-lg transition-all duration-200 -translate-y-1 sm:-translate-y-2`}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center order-2 lg:order-2 w-full max-w-md mx-auto">
          <ConfigFormIcon
            onConfigChange={handleConfigChange}
            initialConfig={config}
          />
        </div>
      </div>

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-xs sm:max-w-sm p-0 border-0 bg-transparent mx-4">
          <div className="relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-2 sm:w-2 sm:h-4 animate-bounce"
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
              className="rounded-2xl sm:rounded-3xl p-4 text-center shadow-2xl border border-purple-400/30"
              style={{ background: "linear-gradient(135deg, #7500FF 0%, #5A00CC 50%, #7500FF 100%)" }}
            >
              <div className="mb-3 sm:mb-4">
                <h3 className="text-white text-lg sm:text-xl font-semibold uppercase tracking-wider mb-2">Your Result</h3>
                <div
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #FFCC59 0%, #FFB800 50%, #FFCC59 100%)" }}
                >
                  <div
                    className="text-white font-bold text-sm sm:text-lg text-center px-1 sm:px-2 leading-tight"
                    style={{ color: "#7500FF", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                  >
                    <img src={result} alt="Icon" className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-white text-base sm:text-lg font-semibold uppercase tracking-wide mb-2">Congratulations!</h4>
                <p className="text-purple-100 text-xs sm:text-sm leading-relaxed px-2">
                  You've won this amazing prize! Good luck and enjoy your reward.
                </p>
              </div>

              <Button
                onClick={closeResult}
                className="w-full text-white font-semibold py-2 sm:py-3 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 border-0 text-sm sm:text-base"
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
