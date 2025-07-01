import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoTicketOutline } from "react-icons/io5";  


function HomePage() {

    return (
        <div className='flex flex-col items-center justify-start gap-[385px] bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-15' >
            <h1 className='arizonia-regular text-7xl select-none'>Welcome</h1>
            <div className='flex flex-col items-center justify-center gap-5'>

                <NavLink to={"/generatetoken"} className='bg-[#DA7722]  border border-[#F0CB00] select-none transition duration-200 w-[270px] tracking-widest py-4 rounded-4xl eb-garamond-italic text-[23px] flex items-center justify-center shadow-[3px_5px_5px_rgba(0,0,0,0.5)]'>GENERATE TOKEN</NavLink>

                <NavLink to={"/showqr"} className='bg-[#DB5A5A] border border-[#D5031E] select-none transition duration-200 w-[270px] py-4 rounded-4xl eb-garamond-italic text-[22px] tracking-widest flex items-center justify-center gap-2 shadow-[3px_5px_5px_rgba(0,0,0,0.5)] '>SHOW MY TOKEN <IoTicketOutline /></NavLink>

            </div>
        </div>
    )
}

export default HomePage
