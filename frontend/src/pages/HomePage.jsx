import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function HomePage() {
  const container = useRef(null);
  const btnGenerate = useRef(null);
  const btnShow = useRef(null);

  useGSAP(() => {
    // Create a timeline for sequential animation
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    tl.from(btnGenerate.current, { opacity: 0, y: -50 })
      .from(btnShow.current, { opacity: 0, y: 50 }, "-=0.5"); 
      // "-=0.5" means second button overlaps a bit
  }, { scope: container }); // optional: scope cleanup for React

  return (
    <div
      ref={container}
      className="flex flex-col items-center justify-start gap-[385px] bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-[15px]"
    >
      <h1 className="arizonia-regular text-7xl select-none">Welcome</h1>

      <div className="flex flex-col items-center justify-center gap-5">
        {/* Animate first button */}
        <div ref={btnGenerate}>
          <NavLink
            to={"/generatetoken"}
            className="bg-[#DA7722] border border-[#F0CB00] select-none transition duration-200 w-[270px] tracking-widest py-4 rounded-4xl eb-garamond-italic text-[23px] flex items-center justify-center shadow-[3px_5px_5px_rgba(0,0,0,0.5)]"
          >
            GENERATE TOKEN
          </NavLink>
        </div>

        {/* Animate second button */}
        <div ref={btnShow}>
          <NavLink
            to={"/showqr"}
            className="bg-[#DB5A5A] border border-[#D5031E] select-none transition duration-200 w-[270px] py-4 rounded-4xl eb-garamond-italic text-[22px] tracking-widest flex items-center justify-center gap-2 shadow-[3px_5px_5px_rgba(0,0,0,0.5)]"
          >
            SHOW MY TOKEN <IoTicketOutline />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
