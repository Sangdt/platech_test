import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CaptchaButton = ({ onVerifyCaptcha, isSubmitting, isValid }) => {
    const [sendingInfomation, setSendingInfomation] = useState(false)
    const { executeRecaptcha } = useGoogleReCaptcha();
    const clickHandler = async (e) => {
        e.preventDefault && e.preventDefault();
        e.persist && e.persist();
        if (isValid) {
            if (!executeRecaptcha) {
                console.log("executeRecaptcha none")
                return;
            }
            setSendingInfomation(true);
            const token = await executeRecaptcha('contact');

            onVerifyCaptcha(token, e);
        }
    };
    useEffect(() => {
        setSendingInfomation(isSubmitting);
        // console.log("CaptchaButton isValid", isValid)
    }, [isSubmitting, isValid])
    return (
        <button
            disabled={sendingInfomation || !isValid}
            onClick={clickHandler}
            // value=""
            id="contactFormSubmit"
            className=" cursor-pointer text-2xl shadow bg-red-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none  float-right text-black font-bold py-2 px-6 rounded disabled:bg-gray-500"
        // type="submit" 
        >
            Gửi {(sendingInfomation) && <CircularProgress size={25} color="success" />}
        </button>
    );
};
const ContactFormBtn = ({ onVerifyCaptcha, nonceValue, isSubmitting, isValid }) => (
    <GoogleReCaptchaProvider
        scriptProps={{
            async: false, // optional, default to false,
            defer: true, // optional, default to false
            appendTo: 'body', // optional, default to "head", can be "head" or "body",
            nonce: nonceValue  // optional, default undefined
        }}
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
        <CaptchaButton onVerifyCaptcha={onVerifyCaptcha}
            isSubmitting={isSubmitting}
            isValid={isValid}
        />
    </GoogleReCaptchaProvider>
);
export default ContactFormBtn;