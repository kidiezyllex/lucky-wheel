const Card = () => {
  return (
    <div className="font-['Hanken_Grotesk'] flex w-80 rounded-[30px] shadow-[10px_20px_20px_rgba(120,87,255,0.3)] backface-hidden">
      <div className="relative w-full flex flex-col text-center items-center justify-center p-5 rounded-[30px] bg-gradient-to-b from-[#734b6d] to-[#42275a] animate-gradient">
        <div className="text-white uppercase mb-2.5 text-xl font-medium">
          Your Result
        </div>
        
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#ef629f] to-[#42275a] flex flex-col items-center justify-center cursor-pointer animate-gradient">
          <div className="text-white uppercase mb-2.5 text-4xl font-semibold bg-gradient-to-r from-[#f7bb97] to-[#dd5e89] bg-clip-text text-transparent scale-[1.6]">
            78
          </div>
          <p className="text-[hsl(241,100%,89%)] text-base font-normal -mt-2">
            of 100
          </p>
        </div>
        
        <div className="mt-5">
          <div className="text-white uppercase mb-2.5 text-2xl font-semibold tracking-[2px]">
            excellent
          </div>
          <p className="text-[hsl(221,100%,96%)] text-[17px] leading-[1.4]">
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </div>
        
        <div className="mt-5">
          <button className="w-fit py-2.5 text-white bg-gradient-to-r from-[#aa076b] to-[#61045f] border-none rounded-full text-sm uppercase tracking-[3px] font-medium cursor-pointer my-5 transition-all duration-300 hover:translate-y-[5px] hover:bg-gradient-to-l hover:from-[#aa076b] hover:to-[#61045f]">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card