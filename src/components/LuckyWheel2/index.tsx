import { useState } from "react"
import LuckyWheelText from "./LuckyWheelText"
import LuckyWheelIcon from "./LuckyWheelIcon"

export default function LuckyWheel2() {
    const [currentWheel, setCurrentWheel] = useState<"text" | "icon">("text")
    return (
        <div className='min-h-screen'> <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex flex-col justify-center py-4 sm:py-10 gap-4 sm:gap-10">
            {/* Navigation */}
            <div className="flex gap-1 bg-black/20 mx-auto w-fit backdrop-blur-sm rounded-full p-1">
                <button
                    onClick={() => setCurrentWheel("text")}
                    className="rounded-full px-3 sm:px-6 text-xs sm:text-sm py-1.5 sm:py-2"
                    style={{
                        color: currentWheel === "text" ? "#7500FF" : "#000000",
                        backgroundColor: currentWheel === "text" ? "#FFCC5A" : "rgba(255,255,255,0.8)",
                        fontWeight: "600",
                    }}
                >
                    <span className="hidden sm:inline">Text Wheel</span>
                    <span className="sm:hidden">Text</span>
                </button>
                <button
                    onClick={() => setCurrentWheel("icon")}
                    className="rounded-full px-3 sm:px-6 text-xs sm:text-sm py-1.5 sm:py-2"
                    style={{
                        color: currentWheel === "icon" ? "#FFCC5A" : "#000000",
                        backgroundColor: currentWheel === "icon" ? "#7500FF" : "rgba(255,255,255,0.8)",
                        fontWeight: "600",
                    }}
                >
                    <span className="hidden sm:inline">Icon Wheel</span>
                    <span className="sm:hidden">Icon</span>
                </button>
            </div>

            {currentWheel === "text" ? (
                <LuckyWheelText />
            ) : (
                <LuckyWheelIcon />
            )}
        </div></div>
    )
}