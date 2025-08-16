import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/store';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function UserPage() {
    const [input, setInput] = useState({
        name: "",
        college_roll: "",
        year: "",
        sem: "",
        foodType: ""
    });

    const { createUser, getFoodCount } = useStore();
    const navigate = useNavigate();

    // 🔹 Refs for animation
    const containerRef = useRef(null);
    const nameRef = useRef(null);
    const rollRef = useRef(null);
    const yearRef = useRef(null);
    const semRef = useRef(null);
    const foodRef = useRef(null);
    const buttonRef = useRef(null);

    // 🔹 Animate on mount
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.45, ease: "power2.out" } });
        tl.from(nameRef.current, { y: -40, opacity: 0 })
          .from(rollRef.current, { y: -40, opacity: 0 }, "-=0.3")
          .from(yearRef.current, { y: -40, opacity: 0 }, "-=0.3")
          .from(semRef.current, { y: -40, opacity: 0 }, "-=0.3")
          .from(foodRef.current, { y: -40, opacity: 0 }, "-=0.3")
          .from(buttonRef.current, { y: -40, opacity: 0 }, "-=0.3");
    }, { scope: containerRef });

    useEffect(() => {
        const fetchFoodCount = async () => {
            try {
                const { data } = await getFoodCount();
                data.foodCount.map((item) => {
                    console.log(`Total ${item._id} food count: ${item.count} `);
                });
            } catch (error) {
                console.error("Error fetching food count:", error);
            }
        };
        fetchFoodCount();
    }, []);

    const handleClick = async () => {
        const { success, message, data } = await createUser(input);
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
        if (data._id) {
            navigate("/showqr");
        }
        setInput({ name: "", college_roll: "", year: "", sem: "", foodType: "" });
    };

    return (
        <div 
            ref={containerRef} 
            className='flex flex-col items-center justify-start gap-4 bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-17 eb-garamond-bold'
        >
            {/* Name Section */}
            <div ref={nameRef} className='flex flex-col items-start justify-start  w-[320px]'>
                <label htmlFor="name" className='pl-0.5'>Name:-</label>
                <input 
                    type="text" 
                    id='name' 
                    placeholder='Kaushik Mukherjee'
                    value={input.name} 
                    onChange={(e) => setInput({ ...input, name: e.target.value })} 
                    className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl" 
                />
            </div>  

            {/* College_Roll Section */}
            <div ref={rollRef} className='flex flex-col items-start justify-start  w-[320px]'>
                <label htmlFor="college_roll" className='pl-0.5'>College Roll:-</label>
                <input 
                    type="text" 
                    id='college_roll' 
                    placeholder='S-431'
                    value={input.college_roll} 
                    onChange={(e) => setInput({ ...input, college_roll: e.target.value })} 
                    className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl" 
                />
            </div>

            {/* Year Section */}
            <div ref={yearRef} className='flex flex-col items-start justify-start w-[320px]'>
                <label htmlFor="year" className='pl-0.5'>Year:-</label>
                <select
                    id="year"
                    value={input.year}
                    onChange={(e) => setInput({ ...input, year: e.target.value })}
                    className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl"
                >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            {/* Semester Section */}
            <div ref={semRef} className='flex flex-col items-start justify-start w-[320px]'>
                <label htmlFor="sem" className='pl-0.5'>Semester:-</label>
                <select
                    id="sem"
                    value={input.sem}
                    onChange={(e) => setInput({ ...input, sem: e.target.value })}
                    className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl"
                >
                    <option value=""></option>
                    {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            {/* Food Section */}
            <div ref={foodRef} className='flex flex-col items-start justify-start w-[320px]'>
                <label htmlFor="foodType" className='pl-0.5'>Food Preference:-</label>
                <div className='flex items-center justify-start gap-4 w-full bg-white/35 backdrop-blur-xs border border-[#920F05] px-3 py-2.5 rounded-2xl'>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="foodType"
                            value="NON-VEG"
                            checked={input.foodType === "NON-VEG"}
                            onChange={(e) => setInput({ ...input, foodType: e.target.value })}
                            className="peer hidden"
                        />
                        <div className="w-5 h-5 rounded-full border border-gray-500 peer-checked:bg-gray-400 bg-white transition-all duration-200"></div>
                        <span className="ml-2 text-white">Non-Veg</span>
                    </label>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="foodType"
                            value="VEG"
                            checked={input.foodType === "VEG"}
                            onChange={(e) => setInput({ ...input, foodType: e.target.value })}
                            className="peer hidden"
                        />
                        <div className="w-5 h-5 rounded-full border border-gray-500 peer-checked:bg-gray-400 bg-white transition-all duration-200"></div>
                        <span className="ml-2 text-white">Veg</span>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <div ref={buttonRef}>
                <NavLink
                    className="px-6 py-2 text-2xl rounded-xl bg-[#D9D9D9] border border-[#920F05] text-[#920F05] transition duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] tracking-wide eb-garamond-semibold"
                    onClick={handleClick}
                >
                    Submit
                </NavLink>
            </div>
        </div>
    )
}

export default UserPage;
