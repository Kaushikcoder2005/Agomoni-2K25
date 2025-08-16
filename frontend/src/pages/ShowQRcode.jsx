import React, { useEffect, useState, useRef } from 'react';
import QRCode from "react-qr-code";
import { useStore } from '../store/store';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function ShowQRcode() {
    const { getFoodCount, findStudentID } = useStore();

    const [value, setValue] = useState("");
    const [input, setInput] = useState({
        college_roll: "",
        sem: ""
    });
    const [showQR, setShowQR] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    // refs for animation
    const inputRefs = useRef([]);
    const formContainer = useRef(null);

    useGSAP(() => {
        if (!showQR) {
            gsap.from(inputRefs.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }
    }, [showQR]);

    useEffect(() => {
        const getUserId = async () => {
            if (hasSubmitted) return setLoading(false);
            try {
                const { data } = await getFoodCount();
                if (data?.userID) {
                    setValue(data.userID);
                    setShowQR(true);
                }
            } catch (error) {
                console.error("Failed to fetch user ID", error);
            } finally {
                setLoading(false);
            }
        };
        getUserId();
    }, [hasSubmitted]);

    const handleIDSubmit = async () => {
        const { success, message, data } = await findStudentID(input);
        if (success) {
            setValue(data._id);
            setShowQR(true);
            setHasSubmitted(true);
            toast.success(message);
        } else {
            toast.error(message);
        }
        setInput({
            college_roll: "",
            sem: ""
        });
    };

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-start bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-20 eb-garamond-bold'>
                <h1 className='arizonia-regular text-7xl text-white select-none'>Loading...</h1>
            </div>
        );
    }

    return (
        <div ref={formContainer} className='flex flex-col items-center justify-start gap-4 bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-20 eb-garamond-bold'>
            {showQR && value ? (
                <>
                    <h1 className='arizonia-regular text-7xl text-white select-none'>Thank You</h1>
                    <div className='flex flex-col items-center gap-6 bg-white/35 backdrop-blur-xs p-4 rounded-xl'>
                        <div className="p-3 bg-white rounded-lg shadow-md">
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "250px", width: "200px" }}
                                value={value}
                                viewBox="0 0 256 256"
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        ref={(el) => (inputRefs.current[0] = el)}
                        className='flex flex-col items-start justify-start w-[320px]'
                    >
                        <label htmlFor="college_roll" className='pl-0.5'>College Roll:</label>
                        <input
                            type="text"
                            id='college_roll'
                            value={input.college_roll}
                            onChange={(e) => setInput({ ...input, college_roll: e.target.value })}
                            className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl"
                        />
                    </div>

                    <div
                        ref={(el) => (inputRefs.current[1] = el)}
                        className='flex flex-col items-start justify-start w-[320px]'
                    >
                        <label htmlFor="sem" className='pl-0.5'>Semester:</label>
                        <select
                            id="sem"
                            name="sem"
                            value={input.sem}
                            onChange={(e) => setInput({ ...input, sem: e.target.value })}
                            className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-2 py-2.5 rounded-2xl"
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>

                    <NavLink
                        ref={(el) => (inputRefs.current[2] = el)}
                        className="px-6 py-2 text-2xl rounded-xl bg-[#D9D9D9] border border-[#920F05] text-[#920F05] transition duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] tracking-wide eb-garamond-semibold"
                        onClick={handleIDSubmit}
                    >
                        Submit
                    </NavLink>
                </>
            )}
        </div>
    );
}

export default ShowQRcode;
