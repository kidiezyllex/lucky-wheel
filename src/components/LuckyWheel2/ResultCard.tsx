const Card = () => {
  return (
    <div className="font-['Hanken_Grotesk'] flex w-80 rounded-[30px] shadow-[10px_20px_20px_rgba(211,39,34,0.3)] backface-hidden">
      <div className="relative w-full flex flex-col text-center items-center justify-center p-5 rounded-[30px] bg-gradient-to-b from-[#D32722] to-[#FFB411] animate-gradient">
        <div className="absolute flex justify-center items-center w-[300px] h-[60%] overflow-hidden z-[1000]">
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[7%] rotate-[-10deg] [animation-delay:182ms] [animation-duration:2000ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[14%] rotate-[20deg] [animation-delay:161ms] [animation-duration:2076ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[21%] rotate-[-51deg] [animation-delay:481ms] [animation-duration:2103ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[28%] rotate-[61deg] [animation-delay:334ms] [animation-duration:1008ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[35%] rotate-[-52deg] [animation-delay:302ms] [animation-duration:1776ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[42%] rotate-[38deg] [animation-delay:180ms] [animation-duration:1168ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[49%] rotate-[11deg] [animation-delay:395ms] [animation-duration:1200ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[56%] rotate-[49deg] [animation-delay:14ms] [animation-duration:1887ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[63%] rotate-[-72deg] [animation-delay:149ms] [animation-duration:1805ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[70%] rotate-[10deg] [animation-delay:351ms] [animation-duration:2059ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[77%] rotate-[4deg] [animation-delay:307ms] [animation-duration:1132ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[84%] rotate-[42deg] [animation-delay:464ms] [animation-duration:1776ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[91%] rotate-[-72deg] [animation-delay:429ms] [animation-duration:1818ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[94%] rotate-[-72deg] [animation-delay:429ms] [animation-duration:818ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[96%] rotate-[-72deg] [animation-delay:429ms] [animation-duration:2818ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[98%] rotate-[-72deg] [animation-delay:429ms] [animation-duration:2818ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[50%] rotate-[-72deg] [animation-delay:429ms] [animation-duration:2818ms]" />
          <div className="absolute w-2.5 h-5 bg-[#FEE010] top-0 opacity-0 animate-makeItRain left-[60%] rotate-[-72deg] [animation-delay:429ms] [animation-duration:1818ms]" />
        </div>
        
        <div className="text-white uppercase mb-2.5 text-xl font-medium">
          Your Result
        </div>
        
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#FEE010] to-[#FFB411] flex flex-col items-center justify-center cursor-pointer animate-gradient">
          <div className="text-white uppercase mb-2.5 text-4xl font-semibold bg-gradient-to-r from-[#D32722] to-[#FFB411] bg-clip-text text-transparent scale-[1.6]">
            78
          </div>
          <p className="text-[hsl(60,100%,95%)] text-base font-normal -mt-2">
            of 100
          </p>
        </div>
        
        <div className="mt-5">
          <div className="text-white uppercase mb-2.5 text-2xl font-semibold tracking-[2px]">
            excellent
          </div>
          <p className="text-[hsl(60,100%,96%)] text-[17px] leading-[1.4]">
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </div>
        
        <div className="mt-5">
          <button className="w-fit py-2.5 text-white bg-gradient-to-r from-[#D32722] to-[#FFB411] border-none rounded-full text-sm uppercase tracking-[3px] font-medium cursor-pointer my-5 transition-all duration-300 hover:translate-y-[5px] hover:bg-gradient-to-l hover:from-[#D32722] hover:to-[#FFB411]">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card