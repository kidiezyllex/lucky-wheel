import { useState } from "react"
import LuckyWheelText from "./LuckyWheelText"
import LuckyWheelIcon from "./LuckyWheelIcon"

export default function LuckyWheel3() {
    const [currentWheel, setCurrentWheel] = useState<"text" | "icon">("text")
    return (
        <div className='h-screen overflow-hidden'> <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black flex flex-col justify-center py-10 gap-10">
            {/* Navigation */}
            <div className="flex gap-1 bg-black/20 mx-auto w-fit backdrop-blur-sm rounded-full p-1">
                <button
                    onClick={() => setCurrentWheel("text")}
                    className="rounded-full px-6 text-sm py-2"
                    style={{
                        color: currentWheel === "text" ? "#7500FF" : "#000000",
                        backgroundColor: currentWheel === "text" ? "#FFCC5A" : "rgba(255,255,255,0.8)",
                        fontWeight: "600",
                    }}
                >
                    Text Wheel
                </button>
                <button
                    onClick={() => setCurrentWheel("icon")}
                    className="rounded-full px-6 text-sm py-2"
                    style={{
                        color: currentWheel === "icon" ? "#FFCC5A" : "#000000",
                        backgroundColor: currentWheel === "icon" ? "#7500FF" : "rgba(255,255,255,0.8)",
                        fontWeight: "600",
                    }}
                >
                    Icon Wheel
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