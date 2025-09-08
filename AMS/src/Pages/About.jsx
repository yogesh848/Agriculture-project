import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";

export const About = () => {
  const [percent91, setPercent91] = useState(0);
  const [percent68, setPercent68] = useState(0);

  useEffect(() => {
    let p91 = 0;
    let p68 = 0;

    const interval = setInterval(() => {
      if (p91 < 91) p91++;
      if (p68 < 68) p68++;

      setPercent91(p91);
      setPercent68(p68);

      if (p91 >= 91 && p68 >= 68) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="overflow-hidden relative w-full">
        <img
          className="w-full h-[400px] object-cover opacity-80"
          src="about.jpg"
          alt="About"
        />
        <button className="rounded-full bg-gray-300 opacity-50 text-black absolute top-[180px] left-[700px] font-semibold text-sm h-9 px-4">
          Home / About
        </button>
        <h2 className="absolute top-[250px] left-[650px] text-white text-5xl font-bold text-center">
          ABOUT US
        </h2>
      </div>
      <div className="">
      <div className="flex-1/2 relative items-right gap-5 p-4 mt-20">
        <img
          className="rounded-md absolute w-[300px] h-[200px] object-cover ml-40"
          src="about1.jpg"
          alt="About"
        />
        <img
          className="rounded-md absolute w-[300px] h-[200px] object-cover mt-64 ml-40"
          src="about2.jpg"
          alt="About"
        />

        <img
          className="rounded-md absolute w-70 h-114 object-cover ml-120"
          src="about3.jpg"
          alt="About"
        />

        <div className="ml-220">
          <div className="text-lg tracking-wider text-green-900">
            Get to Know Agrion
          </div>
          <div className="text-5xl mt-2">We’re agrion expert quality</div>
          <p className="text-5xl mt-4">farming leaders.</p>
          <img className="mt-3" src="leaf.png" alt="About" />
          <p className="leading-8 mt-6 text-gray-400 font-semibold">
            There are many variations of passages of available but the <br />
            majority have suffered alteration in some form, by injected humor <br />
            or words even slightly believable.
          </p>

          <div className="mt-10 space-y-6 relavite">
            <div className="w-full max-w-120">
              <div className="text-green-800 font-semibold text-right mb-1">{percent91}%</div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-800 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${percent91}%` }}
                ></div>
              </div>
            </div>

           
            <div className="w-full max-w-120">
              <div className="text-green-800 font-semibold text-right mb-1">{percent68}%</div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-800 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${percent68}%` }}
                ></div>
              </div>
            </div>
            <p className="absolute text-lg font-bold top-88">
                Agriculture
            </p>
           <p className="absolute text-lg font-bold top-104">
                Organic
            </p>

        </div>
                  </div></div>
      </div>
    </>
  );
};
