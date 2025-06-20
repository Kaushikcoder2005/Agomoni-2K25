import { set } from 'mongoose';
import React, { useState, useEffect, } from 'react'
import QRCode from "react-qr-code";
import { useStore } from '../store/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowQRcode from './ShowQRcode';
import { NavLink, useNavigate } from 'react-router-dom';



function UserPage() {
    const [input, setInput] = useState({
        name: "",
        college_roll: "",
        year: "",
        sem: ""
    })
    const [hidden, setHidden] = useState(true);
    const [value, setValue] = useState("")
    const { createUser, getFoodCount } = useStore()
    const [foodcount, setFoodCount] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoodCount = async () => {
            try {
                const { data } = await getFoodCount();

                data.map((item) => {
                    console.log(item._id);
                    console.log(item.count);
                })

            } catch (error) {
                console.error("Error fetching food count:", error);
            }
        };

        fetchFoodCount();
    }, []);



    const handleClick = async () => {
        const { success, message, data } = await createUser(input);
     
      
            toast.success(message)
     
        if (data._id) {
            setValue(data._id)
            navigate("/showqr", {state:{value:data._id}});
        }

        setInput({
            name: "",
            college_roll: "",
            year: "",
            sem: "",
            foodType: ""
        });
        setHidden(!hidden);
    }

    return (

        <div className='flex flex-col items-center justify-start gap-4 bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-17 eb-garamond-bold' >
               <ToastContainer />
            {/* Name Section  */}
            <div className='flex flex-col items-start justify-start  w-[320px]'>
                <label htmlFor="name" className='pl-0.5'>Name:-</label>
                <input type="text" id='name' value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })} className="bg-white/35 backdrop-blur-xs border border-[#920F05]  focus:outline-none w-full px-2 py-2.5 rounded-2xl" />
            </div>

            {/* College_Roll Section  */}

            <div className='flex flex-col items-start justify-start  w-[320px]'>
                <label htmlFor="college_roll" className='pl-0.5'>College Roll:-</label>
                <input type="text" id='college_roll' value={input.college_roll} onChange={(e) => setInput({ ...input, college_roll: e.target.value })} className="bg-white/35 backdrop-blur-xs border  border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl" />
            </div>


            {/* Year Section */}
            <div className='flex flex-col items-start justify-start w-[320px]'>
                <label htmlFor="year" className='pl-0.5'>Year:-</label>
                <select
                    id="year"
                    name="year"
                    value={input.year}
                    onChange={(e) => setInput({ ...input, year: e.target.value })}
                    className="bg-white/35 backdrop-blur-xs border border-[#920F05]  focus:outline-none w-full px-2 py-2.5 rounded-2xl"
                >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            {/* Semester Section */}
            <div className='flex flex-col items-start justify-start w-[320px]'>
                <label htmlFor="sem" className='pl-0.5'>Semester:-</label>
                <select
                    id="sem"
                    name="sem"
                    value={input.sem}
                    onChange={(e) => setInput({ ...input, sem: e.target.value })}
                    className="bg-white/35 backdrop-blur-xs border  border-[#920F05]  focus:outline-none w-full px-2 py-2.5 rounded-2xl"
                >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>

            {/* FoodSection */}

            <div className='flex flex-col items-start justify-start w-[320px]'>
                <label htmlFor="foodType" className='pl-0.5'>Food Preference:-</label>
                <div className='flex items-center justify-start gap-4 w-full bg-white/35 backdrop-blur-xs border  border-[#920F05]  focus:outline-none px-3 py-2.5 rounded-2xl'>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="foodType"
                            id="non-veg"
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
                            id="veg"
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
            <NavLink
                className="px-6 py- text-2xl rounded-xl bg-[#D9D9D9] border border-[#920F05]  text-[#920F05] transition duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] tracking-wide eb-garamond-semibold"
                onClick={handleClick}
                to={"/showqr"}
                
            >
                Submit
            </NavLink>



  
        </div >

    )
}

export default UserPage
