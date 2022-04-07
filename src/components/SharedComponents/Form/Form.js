/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
// import usePortal from 'react-useportal'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


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
);

const itemsTest = [
    {
        "_key": "d27166a56aa5",
        "_type": "formFields",
        "dataType": "text",
        "label": "Họ và tên",
        "requiredFields": true
    },
    {
        "_key": "707425f48d96",
        "_type": "formFields",
        "dataType": "phoneNumber",
        "error": {
            "pattern": "Đây không phải là số điện thoại"
        },
        "pattern": /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/i,
        "label": "Số điện thoại",
        "requiredFields": true
    },
    {
        "_key": "e880ffe4797d",
        "_type": "formFields",
        "dataType": "email",
        "label": "Email",
        "error": {
            "pattern": "Đây không phải là email"
        },
        "pattern": /^\S+@\S+$/i,
        "requiredFields": true
    },
    {
        "_key": "b5af77a25694",
        "_type": "formFields",
        "dataType": "textarea",
        "label": "Nội dung tư vấn",
        "requiredFields": false
    }
]
export default function ContactForm({ title, productID, productName, nested, closeParentPortal, textWhite = true, paddingRow = true }) {
    // const [openPortal, closePortal, isOpen, Portal] = usePortal();
    const [closed, setClosed] = useState(false);
    const [blocking, setBlocking] = useState(false);

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
            textWhite={textWhite}
            productName={productName}
            paddingRow={paddingRow}
            fields={itemsTest}
            title={title} />
        <ToastContainer enableMultiContainer containerId={toastContainerId}
            autoClose={10000}
            draggable={false}

            position={toast.POSITION.BOTTOM_RIGHT}
        />
    </div>
    );
}

const SubmitInfoForm = ({ title, fields, portalState, blocking, setBlocking, onSuccessSubmitted, textWhite, paddingRow, productName }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' });
    const onSubmit = async data => {
        setBlocking(true);
        console.log("submit data", data)
        // await fetch('/api/submitForm', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: JSON.stringify(data)
        // }).then(async r => {
        //     const res = await r.json();
        //     if (res.errors) {
        //         console.log("errors", res);
        //         return;
        //     }
        //     // if (window.fbq) {

        //     // }
        //     onSuccessSubmitted();
        // });

    }
    // console.log("error",errors)
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
    }, [portalState])
    return (<> {title && <span className=" text-2xl pb-4">{title}</span>}
        <BlockUi tag="div" blocking={blocking}>
            <form className="w-full text-blue-900" onSubmit={handleSubmit(onSubmit)}>
                {productName && <div className="w-full px-3 lg:w-1/2">
                    <label className={`"block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`}>Sản phẩm bạn cần tư vấn </label>
                    <input value={productName} type="text"
                        disabled
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>}
                {fields.map((item, index) => (<div key={item._key ?? index} className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 lg:w-1/2">
                        <label className={`block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`} htmlFor="fullName">
                            {item.label}
                        </label>
                        {errors[item.label] && (
                            <span className="text-red-500	" role="alert">
                                {errors[item.label].type === "required"
                                    && "Trường này không được để trống"}
                                {errors[item.label].type === "pattern" && <>
                                    {item.error[errors[item.label].type] ?? "Sai định dạng, xin kiểm tra lại thông tin "}
                                </>}
                                {errors[item.label].type === "maxLength"
                                    && `Chỉ cho phép ${item.maxLength ?? 12} ký tự`}
                            </span>
                        )}
                        {item.dataType !== "textarea" ? <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type={item.dataType}
                            placeholder={item.label}
                            // name="fullName"
                            {...register(item.label, {
                                required: item.requiredFields,
                                ...item
                            })} /> : <textarea
                            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 md:w-1/2 lg:w-full resize-none"
                            name="clientSupportInfo"
                            {...register(item.label, {
                                required: item.requiredFields,
                                ...item
                            })
                            } />
                        }
                    </div>
                </div>))}
                {/* <div className="w-full px-3 lg:w-1/2">
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

                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 lg:w-1/2">
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
                                required: true,
                                maxLength: 12,
                                pattern: /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/i
                            })} />
                    </div>
                </div>
                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 lg:w-1/2">
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
                {productName && <div className="w-full px-3 lg:w-1/2">
                    <label className={`"block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`}>Sản phẩm bạn chọn </label>
                    <input value={productName} type="text"
                        disabled
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>}
                <div className={`flex flex-wrap  ${paddingRow && '-mx-3 mb-6'}`}>
                    <div className="w-full px-3 lg:w-1/2">
                        <label className={`"block uppercase tracking-wide ${textWhite && 'text-white'} font-bold mb-1`} htmlFor="clientSupportInfo">
                            Nội dung tư vấn:
                        </label>
                        {errors.clientSupportInfo && <> <span className="text-red-500	" role="alert">
                            {errors.clientSupportInfo.type === "maxLength"
                                && "Chỉ cho phép 1000 ký tự"}
                            {/* {errors.clientSupportInfo.type === "required"
                                && "Trường này không được để trống"} 
                        </span></>}

                        <textarea
                            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 md:w-1/2 lg:w-full resize-none"
                            name="clientSupportInfo"
                            {...register("clientSupportInfo", { maxLength: 1000 })} />
                    </div>
                </div>
                 */}
                <button type="button"
                    className="cursor-pointer text-2xl shadow bg-blue-300 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-6 rounded"
                    onClick={() => reset({ defaultValues })}>
                    Reset
                </button>
                <div className="flex flex-wrap mb-6 items-center float-right">
                    <input
                        value="Gửi"
                        id="contactFormSubmit"
                        className=" cursor-pointer text-2xl shadow bg-red-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-6 rounded"
                        type="submit" />
                </div>
            </form>
        </BlockUi>
    </>);
}