import React, { useState, useEffect, useRef } from 'react';
import QrReader from 'react-qr-barcode-scanner';
import { useStore } from '../store/store';
import { toast } from 'react-toastify';

function Admin() {
    const [qrdata, setQRData] = useState("");
    const [studentData, setStudentData] = useState({});
    const [show, setShow] = useState(true);
    const { validateAdmin, adminLogin, FindStudentsByID } = useStore();
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const errorToastShown = useRef(false); // To avoid duplicate toasts

    const FindeStudentData = async (id) => {
        const { success, message, data } = await FindStudentsByID(id);
        if (success) {
            setStudentData(data);
            if (!errorToastShown.current) {
                toast.success(message);
                errorToastShown.current = true;
            }
        } else {
            setQRData("");
            if (!errorToastShown.current) {
                toast.error(message);
                errorToastShown.current = true;
            }
        }
    };

    useEffect(() => {
        if (qrdata) {
            FindeStudentData(qrdata);
        }
    }, [qrdata]);

    useEffect(() => {
        const fetchAdminLogin = async () => {
            const { success, message } = await adminLogin();
            if (success) {
                setShow(true);
            } else {
                setShow(false);
                setQRData("");
                if (!errorToastShown.current) {
                    toast.error(message);
                    errorToastShown.current = true;
                }
            }
        };
        fetchAdminLogin();
    }, []);

    const toggleQRData = () => {
        setQRData("");
        setStudentData({});
        errorToastShown.current = false; // Reset toast state
    };

    const adminValidation = async () => {
        const { success, message } = await validateAdmin(input);
        if (success) {
            setShow(true);
        } else {
            setShow(false);
            toast.error(message);
            setQRData("");
        }
    };

    return (
        <div className='flex flex-col items-center justify-start bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-16'>
            <h1 className='arizonia-regular text-7xl select-none text-center mb-4'>Admin Login</h1>

            {!show ? (
                <div className='flex flex-col items-center justify-center gap-6'>
                    <div className='flex flex-col items-start justify-start w-[320px] gap-4'>
                        <div className='w-full'>
                            <label htmlFor="username" className='pl-1 block'>Username:</label>
                            <input
                                type="text"
                                id='username'
                                className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-3 py-2.5 rounded-2xl"
                                value={input.username}
                                onChange={(e) => setInput({ ...input, username: e.target.value })}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className='pl-1 block'>Password:</label>
                            <input
                                type="password"
                                id='password'
                                className="bg-white/35 backdrop-blur-xs border border-[#920F05] focus:outline-none w-full px-3 py-2.5 rounded-2xl"
                                value={input.password}
                                onChange={(e) => setInput({ ...input, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        className="px-6 py-2 text-2xl rounded-xl bg-[#D9D9D9] border border-[#920F05] text-[#920F05] transition duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] tracking-wide eb-garamond-semibold"
                        onClick={adminValidation}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <div className='flex flex-col items-center gap-6'>
                    {!qrdata ? (
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <QrReader
                                height={500}
                                width={250}
                                onUpdate={(err, result) => {
                                    if (result?.text && result.text !== qrdata) {
                                        setQRData(result.text);
                                        errorToastShown.current = false; // reset for new scan
                                    }
                                }}
                                constraints={{ facingMode: 'environment' }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                    ) : (
                        <>
                            <div className='bg-black/40 backdrop-blur-sm border border-[#920F05] w-full max-w-md mx-auto px-4 py-4  rounded-2xl text-left'>
                                <p className="text-xl md:text-2xl my-2 text-white"><strong className="font-semibold">Name:</strong> {studentData.name}</p>
                                <p className="text-xl md:text-2xl my-2 text-white"><strong className="font-semibold">Roll:</strong> {studentData.college_roll}</p>
                                <p className="text-xl md:text-2xl my-2 text-white"><strong className="font-semibold">Year:</strong> {studentData.year}</p>
                                <p className="text-xl md:text-2xl my-2 text-white"><strong className="font-semibold">Semester:</strong> {studentData.sem}</p>
                                <p className="text-xl md:text-2xl my-2 text-white"><strong className="font-semibold">Food Preference:</strong> {studentData.foodType}</p>
                            </div>

                            <button
                                className="mt-6 px-7 py-2 text-3xl md:text-4xl rounded-xl bg-[#D9D9D9] border border-[#920F05] text-[#920F05] transition duration-300 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] tracking-wide eb-garamond-semibold"
                                onClick={toggleQRData}
                            >
                                Done
                            </button>



                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Admin;
