/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
// import usePortal from 'react-useportal'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import BlockUi from 'react-block-ui';
import { useTheme } from '@mui/material/styles';

import 'react-block-ui/style.css';
import ContactFormBtn from './ReCaptchaComponent/ContactFormBtn';

// import BlogList from '../../BlogList';

// import { Modal, ModalSideEffect } from "@/SharedComponents/Modal/BasedModal";

const NULL_EVENT = { currentTarget: { contains: () => false } };
const toastCustomId = "ContactFormConfirm";
const toastContainerId = "ContactFormToast";


const defaultValues = {
    fullName: "",
    Email: "",
    phoneNumber: "",
    clientSupportInfo: " ",
    productName: ""
    //"Địa chỉ":""
};
const Msg = ({ closeToast }) => (
    <div>
        <h3 className="text-2xl text-teal-800 pb-4">
            Chúng tôi đã nhận được thông tin của bạn.
        </h3>
        <h3 className="text-2xl text-teal-800 pb-4">
            Xin cám ơn.
        </h3>
    </div>
)


export default function ContactForm({ title, productID, productName, nested, closeParentPortal, textWhite = false, paddingRow = true }) {
    // const [openPortal, closePortal, isOpen, Portal] = usePortal();
    const [closed, setClosed] = useState(false);
    const [blocking, setBlocking] = useState(false);
    const theme = useTheme();
    // const { themeToggler } = theme;
    const { mode } = theme.palette;
    const onSuccessSubmitted = () => {
        // openPortal(NULL_EVENT);
        toast(<Msg />, {
            onOpen: () => setClosed(false),
            onClose: () => onPortalClose(),
            // position:'bottom-right',
            toastId: toastCustomId,
            containerId: toastContainerId
        });
        if (window.fbq) {
            window.fbq('track', 'SubmitApplication');;
            window.fbq('track', "Contact");
        }
    }

    const onPortalClose = (e) => {
        setBlocking(false)
        setClosed(true);
        closeParentPortal && closeParentPortal(e ?? NULL_EVENT);
    }

    return (<div className=" rounded-t-lg border-t border-b border-l border-r border-gray-400 justify-center p-8">
        <SubmitInfoForm
            blocking={blocking}
            setBlocking={setBlocking}
            portalState={closed}
            onSuccessSubmitted={onSuccessSubmitted}
            textWhite={textWhite || mode !== 'light'}
            productName={productName}
            paddingRow={paddingRow}
            title={title} />
        <ToastContainer enableMultiContainer containerId={toastContainerId}
            autoClose={10000}
            draggable={false}

            position={toast.POSITION.BOTTOM_RIGHT}
        />
    </div>
    );
}

const SubmitInfoForm = ({ title, portalState, blocking, setBlocking, onSuccessSubmitted, textWhite, paddingRow, productName }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ mode: 'all' });

    const onSubmit = async data => {
        // console.log("executeRecaptcha",executeRecaptcha,process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
        // const token = await executeRecaptcha('contact');
        // onVerifyCaptcha(token);
        setBlocking(true);
        // console.log("submit data", data)
        await fetch('/api/submitForm', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }).then(async r => {
            const res = await r.json();
            if (res.errors) {
                console.log("errors", res);
                return;
            }
            // if (window.fbq) {

            // }
            onSuccessSubmitted();
        });

    }
    const onVerifyCaptcha = (token, e) => {
        setValue('captchaToken', token);
        console.log("event", e)
        handleSubmit(onSubmit)(e);
    };
    useEffect(() => {
        if (productName) {
            // console.log("productName",productName)
            register('productName', { value: productName });
            if (window.fbq) {
                let submitButton = document.getElementById('contactFormSubmit');
                submitButton.addEventListener(
                    'click',
                    function () {
                        fbq("track", "CompleteRegistration", {
                            content_name: productName,
                            //  currency, status, value
                        });
                    },
                    false
                );
            }
        }
    }, [productName]);

    useEffect(() => {
        if (portalState) {
            reset({ defaultValues });
        }
    }, [portalState]);
    useEffect(() => {
        register('captchaToken');
    });
    return (<> {title && <span className=" text-2xl pb-4">{title}</span>}
        <BlockUi tag="div" blocking={blocking}>
            <form className=" text-blue-900"
            // onSubmit={handleSubmit(onSubmit)}
            >
                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 sm:w-1/2">
                        <label className={`block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`} htmlFor="fullName">
                            Tên của bạn(bắt buộc)
                        </label>
                        {errors.fullName && (
                            <span className="text-red-500	" role="alert">
                                {errors.fullName.type === "required"
                                    && "Trường này không được để trống"}
                            </span>
                        )}
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            placeholder="Họ và tên"
                            // name="fullName"
                            {...register('fullName', { required: true, maxLength: 100 })} />
                    </div>
                </div>
                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 sm:w-1/2">
                        <label className={`block uppercase tracking-wide ${textWhite && 'text-white'}  font-bold mb-1`} htmlFor="phoneNumber">
                            Số điện thoại của bạn(bắt buộc):
                        </label>
                        {errors.phoneNumber && (
                            <span className="text-red-500	" role="alert">
                                {errors.phoneNumber.type === "required" && "Trường này không được để trống"}
                                {errors.phoneNumber.type === "pattern" && "Đây không phải là số điện thoại"}
                                {errors.phoneNumber.type === "maxLength"
                                    && "Chỉ cho phép 12 ký tự"}
                            </span>
                        )}
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text" placeholder="Số điện thoại"
                            // name="phoneNumber"
                            {...register("phoneNumber", {
                                required: true, maxLength: 12,
                                pattern: /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/i
                            })} />
                    </div>
                </div>
                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 sm:w-1/2">
                        {errors.Email && (
                            <span className="text-red-500	" role="alert">
                                {errors.Email.type === "required" && "Trường này không được để trống"}
                                {errors.Email.type === "pattern" && "Đây không phải là địa chỉ email"}
                            </span>
                        )}
                        <label className={`block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`} htmlFor="Email">
                            Email của bạn(bắt buộc):
                        </label>

                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="email"
                            placeholder="Email"
                            // name="Email"
                            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                    </div>
                </div>
                {productName && <div className="w-full px-3 sm:w-1/2">
                    <label className={`"block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`}>Sản phẩm bạn chọn </label>
                    <input value={productName} type="text"
                        disabled
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>}
                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 sm:w-1/2">
                        <label className={`"block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`} htmlFor="clientSupportInfo">
                            Nội dung tư vấn:
                        </label>
                        {errors.clientSupportInfo && <> <span className="text-red-500	" role="alert">
                            {errors.clientSupportInfo.type === "maxLength"
                                && "Chỉ cho phép 1000 ký tự"}
                            {/* {errors.clientSupportInfo.type === "required"
                                && "Trường này không được để trống"} */}
                        </span></>}

                        <textarea
                            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 md:w-1/2 lg:w-full resize-none"
                            name="clientSupportInfo"
                            {...register("clientSupportInfo", { maxLength: 1000 })} />
                    </div>
                </div>
                <button type="button"
                    className="cursor-pointer text-2xl shadow bg-blue-300 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-6 rounded"
                    onClick={() => reset({ defaultValues })}>
                    Reset
                </button>
                <div className="flex flex-wrap mb-6 items-center float-right">
                    <ContactFormBtn onVerifyCaptcha={onVerifyCaptcha} />
                    {/* <input
                        value="Gửi"
                        id="contactFormSubmit"
                        className=" cursor-pointer text-2xl shadow bg-red-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-6 rounded"
                        type="submit" /> */}
                </div>
            </form>
        </BlockUi>
    </>);
}

