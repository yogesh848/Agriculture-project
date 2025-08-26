import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCart } from "../components/productCart";
import { Header } from "../components/Header";


export const Home = () => {
  const [logo, setLogo] = useState("return.png");
  const [logo1, setLogo1] = useState("ship.png");
  const [logo2, setLogo2] = useState("store.png");
  const [logo3, setLogo3] = useState("payment.png");

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (window.scrollY === 0) {
      gsap.from(".scroll1", {
        y: -400,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
      gsap.from(".scroll2", {
        y: 400,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <>
    <Header/>
      <div className="overflow-hidden relative w-full h-[750px]">
        <img
          className="w-full h-full opacity-70 object-cover transform transition-transform duration-10000 ease-in-out hover:scale-150"
          src="home.jpg"
          alt="Home"
        />
        <p className="scroll1 absolute top-50 left-140 font-bold  flex text-black text-2xl text-center">
          We are Producing Natural Product
        </p>
        <img
          className="absolute top-56 left-130 flex"
          src="slider.jpg"
          alt=""
        />
        <h2 className="absolute scroll1 top-60 left-100  flex font-bold text-white text-9xl text-center">
          Agriculture
        </h2>
        <button className="rounded-full scroll2 bg-green-700 text-black absolute top-130 left-150 cursor-pointer active:scale-95 transition duration-150 hover:bg-white  flex font-bold text-xl w-60 h-16 p-4 justify-center">
          Start Shoping <span></span>
        </button>
      </div>
      <div>
        <ul className="flex bg-green-700 h-40 w-full items-center p-10">
          <img
            className="flex ml-16 h-20 w-20 transition-transform duration-300 hover:scale-110"
            src={logo}
            alt=""
            onMouseOver={() => setLogo("return.png")}
            onMouseOut={() => setLogo("return1.png")}
          />

          <li className="ml-4 font-bold text-lg  text-white  ">
            Return policy <br />
            <span className="text-base opacity-50 font-semibold">
              Money back guarantee{" "}
            </span>
          </li>
          <li className="border-l ml-12 border-gray-400 h-26"></li>
          <img
            className="flex ml-10 h-20 w-20 transition-transform duration-300 hover:scale-110"
            src={logo1}
            alt=""
            onMouseOver={() => setLogo1("ship.png")}
            onMouseOut={() => setLogo1("ship1.png")}
          />
          <li className="ml-4 font-bold text-lg  text-white">
            Free Shipping <br />
            <span className="text-base opacity-50 font-semibold">
              YOn all orders over RS.200{" "}
            </span>
          </li>

          <li className="border-l  ml-12 border-gray-400 h-26"></li>
          <img
            className="flex  ml-6 transition-transform duration-300 hover:scale-110"
            src={logo2}
            alt=""
            onMouseOver={() => setLogo2("store.png")}
            onMouseOut={() => setLogo2("store1.png")}
          />
          <li className="ml-4 font-bold text-lg  text-white">
            Store Locator <br />{" "}
            <span className="text-base opacity-50 font-semibold">
              Find your nearest store{" "}
            </span>
          </li>
          <li className="border-l border-gray-400 h-26 ml-12"></li>
          <img
            className="flex  ml-6 h-20 transition-transform duration-300 hover:scale-110"
            src={logo3}
            alt=""
            onMouseOver={() => setLogo3("payment.png")}
            onMouseOut={() => setLogo3("payment1.png")}
          />
          <li className="ml-4 font-bold text-lg  text-white">
            Secure Payments <br />{" "}
            <span className="text-base opacity-50 font-semibold">
              You’re on safe and secure{" "}
            </span>
          </li>
        </ul>
      </div>

      <div className="text-center mt-30 text-xl text-green-700 font-semibold">
        Checkout Our Products
      </div>
      <div className='text-center mt-6 text-5xl [font-family:"Amatic SC",cursive]'>
        New Featured Products
      </div>
      <img className="items-center mt-6 ml-180" src="leaf.png" alt="leaf" />
      <ProductCart/>
      
       
    </>
  );
};
