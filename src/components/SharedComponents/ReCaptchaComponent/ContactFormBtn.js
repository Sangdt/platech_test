import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import React from 'react';

const CaptchaButton = ({ onVerifyCaptcha }) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const clickHandler = async (e) => {
        e.preventDefault && e.preventDefault();
        e.persist && e.persist();
        if (!executeRecaptcha) {
            console.log("executeRecaptcha none")
            return;
        }
   
        const token = await executeRecaptcha('contact');

        onVerifyCaptcha(token,e);
    };

    return (
        <button
            onClick={clickHandler}
            // value=""
            id="contactFormSubmit"
            className=" cursor-pointer text-2xl shadow bg-red-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-6 rounded"
        // type="submit" 
        >
            Gửi</button>
    );
};
const ContactFormBtn = ({ onVerifyCaptcha }) => (
    <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
        <CaptchaButton onVerifyCaptcha={onVerifyCaptcha} />
    </GoogleReCaptchaProvider>
);
export default ContactFormBtn;