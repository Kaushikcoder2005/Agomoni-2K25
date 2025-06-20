import React from 'react'
import QRCode from "react-qr-code";
import { useLocation } from 'react-router-dom';

function ShowQRcode() {

    const location = useLocation();
    const { value } = location.state || {};

    return (
        <div className='flex flex-col items-center justify-start gap-4 bg-center bg-cover bg-[url(./images/background.jpg)] h-screen w-full pt-17 eb-garamond-bold'>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "250", width: "200" }}
                value={value || ""}
                viewBox={`0 0 256 256`}
                
            />
        </div>
    )
}

export default ShowQRcode
