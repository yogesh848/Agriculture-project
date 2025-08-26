import React from "react";

export const Header = () => {
  return (
    <>
      
      <div className="bg-green-950">
        <div className="flex relative ml-10 h-20 w-30">
          <img className="mt-5" src="logo.png" alt="" />
        </div>

        <div className="bg-green-900 absolute top-9 left-50 text-white font-bold flex items-center rounded-full h-2 p-6 w-[80%] mx-auto">
          <img src="mail.png" className="h-6 w-6 ml-4" alt="Mail" />
          <span className="ml-1">agri@gmail.com</span>

          <img src="location.png" className="h-6 w-6 ml-12" alt="Location" />
          <span className="ml-1">Tirunelveli</span>

          <div className="flex ml-150 space-x-6">
            <img src="fb.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Facebook" />
            <img src="insta.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Instagram" />
            <img src="x.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Twitter" />
            <img src="p.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Cart" />
          </div>
        </div>
      </div>

      
      <div className="uppercase h-16 bg-green-950 sticky top-0 flex items-center justify-center space-x-20 font-semibold w-full z-50 shadow-md">
        <p className="cursor-pointer text-white hover:text-green-500">HOME</p>
        <p className="cursor-pointer text-white hover:text-green-500">PRODUCT</p>
        <p className="cursor-pointer text-white hover:text-green-500">SHOP</p>
        <p className="cursor-pointer text-white hover:text-green-500">ABOUT</p>
        <p className="cursor-pointer text-white hover:text-green-500">CONTACT</p>
        <div className="flex ml-20">
          <img className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" src="search.png" alt="Search" />
          <img className="w-8 h-8 ml-12 cursor-pointer hover:scale-110 transition-transform" src="cart2.png" alt="Cart" />
        </div>
      </div>
    </>
  );
};
