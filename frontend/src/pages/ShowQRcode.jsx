import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import { useLocation } from 'react-router-dom';
import { useStore } from '../store/store';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


function ShowQRcode() {

    const location = useLocation();
    // const { value } = location.state || {};
    const { getFoodCount,findStudentID } = useStore()
    const [value, setValue] = useState("")
    const [input, setInput] = useState({
        college_roll: "",
        sem: ""
    })

    useEffect(() => {
        const getUserId = async () => {

            const { data } = await getFoodCount();
            setValue(data.userID);
        }
        getUserId();
    }, [])


    const handleIDSubmit = async () => {
        const {success,message,data} = await findStudentID(input) ;
        if (success) {
            setValue(data._id);
            toast.success(message);
        } else {
            toast.error(message);
        }
        setInput({
            college_roll: "",
            sem: ""
        });

    }

    return (
        <div className='flex flex-col items-center justify-start gap-4 bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-17 eb-garamond-bold'>

            {
                value ? (
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "250", width: "200" }}
                        value={value || ""}
                        viewBox={`0 0 256 256`}
                    />
                ) : (
                    <>
                        {/* College_Roll Section  */}
                        <div className='flex flex-col items-start justify-start  w-[320px]'>
                            <label htmlFor="college_roll" className='pl-0.5'>College Roll:-</label>
                            <input type="text" id='college_roll' value={input.college_roll} onChange={(e) => setInput({ ...input, college_roll: e.target.value })} className="bg-white/35 backdrop-blur-xs border  border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl" />
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
                        <NavLink
                            className="px-6 py- text-2xl rounded-xl bg-[#D9D9D9] border border-[#920F05]  text-[#920F05] transition duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] tracking-wide eb-garamond-semibold"
                            onClick={handleIDSubmit}


                        >
                            Submit
                        </NavLink>
                    </>

                )
            }


        </div>
    )
}

export default ShowQRcode
