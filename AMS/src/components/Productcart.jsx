import React from 'react'

export const ProductCart = () => {
  return (
    <div>

      <div className="container border border-gray-200 rounded-md h-[280px] w-[280px] ml-40 mt-10 flex justify-center items-center bg-white">
  <img
    src="tomato.png"
    alt="tomato"
    className="w-[180px] cursor-pointer h-[180px] transition-transform duration-300 hover:scale-110"
  />
</div>

       
        
        <div className="flex ml-60 mt-8">
          <img className="h-5 w-5 " src="star.png" alt="" />
          <img className="h-5 w-5 " src="star.png" alt="" />
          <img className="h-5 w-5 " src="star.png" alt="" />

          <img className="h-5 w-5 " src="star.png" alt="" />
          <img className="h-5 w-5 " src="star.png" alt="" />
        </div>
        <div className="font-bold cursor-pointer text-xl ml-62 tracking-widest hover:text-yellow-500">
          Tomato
        </div>
        <div className="ml-64 tracking-wider text-gray-400 ">
          RS.40.00
        </div>
        <button className="text-black ml-54 mt-1 bg-white hover:bg-green-900 hover:text-white font-semibold h-10 w-40 rounded-md border-2 border-black transition-colors duration-300">
  View Details
</button>

      </div>
      
  )
}
