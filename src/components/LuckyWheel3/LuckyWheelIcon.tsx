"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"

const textItems = [
  "/icons/icon1.webp",
  "/icons/icon2.webp",
  "/icons/icon3.webp",
  "/icons/icon4.webp",
  "/icons/icon5.webp",
  "/icons/icon6.webp",
  "/icons/icon7.webp",
  "/icons/icon8.webp",
]
export default function LuckyWheelIcon() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState("")

  const wheelItems = textItems.slice(0, 8).concat(Array(Math.max(0, 8 - textItems.length)).fill(""))

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

    setTimeout(() => {
      setIsSpinning(false)
      
      const finalAngle = totalRotation % 360
      
      let closestTo180 = { index: 0, angle: 0, distance: 360 }
      
      Array.from({ length: 8 }).forEach((_, index) => {
        const angle = index * 45
        const finalDivAngle = (angle + finalAngle) % 360
        const distanceTo180 = Math.abs(finalDivAngle - 180)
        if (distanceTo180 < closestTo180.distance) {
          closestTo180 = { index, angle: finalDivAngle, distance: distanceTo180 }
        }
      })
      
      const actualResult = wheelItems[closestTo180.index]
      
      setResult(actualResult || "")
      setShowResult(true)
    }, 5000)
  }

  const closeResult = () => {
    setShowResult(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-80vh overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="relative w-80 h-80 overflow-hidden">  
          <div
            className="w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center center",
              transition: isSpinning ? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            <img src="/images/wheel3.png" alt="Lucky Wheel" className="w-full h-full object-contain bg-transparent" draggable={false} />
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = index * 45
              const radius = 160 
              const textRadius = 120 // Khoảng cách từ tâm đến text
              
              return (
                <div
                  key={`line-${index}`}
                  className="absolute pointer-events-none flex items-center justify-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: "36px",
                    height: `${radius}px`,
                    transformOrigin: "18px 0",
                    transform: `translate(-18px, 0) rotate(${angle}deg)`,
                  }}
                >
                  <img 
                    src={wheelItems[index]} 
                    alt="Icon" 
                    className="h-full w-auto object-contain" 
                    
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
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 transition-all duration-200 ${
            isSpinning 
              ? "scale-95 opacity-50 cursor-not-allowed pointer-events-none" 
              : "hover:scale-110 active:scale-95 cursor-pointer"
          }`}
          style={{ zIndex: 10 }}
        >
          <img 
            draggable={false}
            src="/images/arrow3.png" 
            alt="Spin Arrow" 
            className={`w-full h-full object-contain drop-shadow-lg transition-all duration-200 -translate-y-1.5 ${
              isSpinning ? "animate-pulse" : ""
            }`} 
          />
        </button>
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
              className="rounded-3xl p-6 text-center shadow-2xl border border-pink-400/30"
              style={{ background: "linear-gradient(135deg, #F83D60 0%, #FFCF96 50%, #F83D60 100%)" }}
            >
              <div className="mb-4">
                <h3 className="text-white text-xl font-semibold uppercase tracking-wider mb-2">Your Result</h3>
                <div
                  className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #FFFDF4 0%, #FFCF96 50%, #FFFDF4 100%)" }}
                >
                  <div
                    className="text-white font-bold text-lg text-center px-2 leading-tight"
                    style={{ color: "#F83D60", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                  >
                    <img src={result} alt="Icon" className="w-14 h-14 object-contain" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white text-lg font-semibold uppercase tracking-wide mb-2">Congratulations!</h4>
                <p className="text-pink-100 text-sm leading-relaxed">
                  You've won this amazing prize! Good luck and enjoy your reward.
                </p>
              </div>

              <Button
                onClick={closeResult}
                className="w-full text-white font-semibold py-3 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 border-0"
                style={{
                  background: "linear-gradient(135deg, #FFFDF4 0%, #FFCF96 100%)",
                  color: "#F83D60",
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
