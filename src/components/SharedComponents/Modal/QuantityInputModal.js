/* eslint-disable no-unused-expressions */
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useUser } from '@/Helper/auth/useUser'
import { AddToCartReCaptcha } from "@/SharedComponents/Captcha";


function QuantityInputModal({ productID, addtoCartBtnContent, addCompleteMess, setUpdated = null }) {
    const { user } = useUser()
    const { register, handleSubmit, errors, setValue, formState } = useForm();

    const onSubmit = async ({ productID, Quantity, captchaToken }) => {
        await fetch('/api/cart/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': user.token
            },
            body: JSON.stringify({
                productID, Quantity, captchaToken
            })
        }).then(async r => {
            const res = await r.json();
            if (!res.success) {
                console.log("errors", res);
                return;
            }
            // onSuccessSubmitted();
        })
    }
    const onVerifyCaptcha = (token, e) => {
        //console.log("captchaToken",token)
        setValue('captchaToken', token);
        handleSubmit(onSubmit)(e);
    };
    //console.log(errors);
    useEffect(() => { setUpdated && setUpdated(formState.isSubmitSuccessful), [formState.isSubmitSuccessful] })
    useEffect(() => {
        register({ name: 'captchaToken' }, { required: true });
    },[]);
    return (<>
        <form className=" w-full text-blue-900" >
            <div className="flex-wrap mb-6 ">
                {errors.Quantity && (<span className="text-red-500 uppercase text-1xl" role="alert">
                    {errors.Quantity.type === "required"
                        && "Trường này không được để trống"}
                    {errors.Quantity.type === "min"
                        && "Số lượng ít nhất là 1"}
                </span>)}
                <input className=" shadow appearance-none border rounded py-2 px-3 text-black"
                    disabled={formState.isSubmitting && !errors.Quantity}
                    type="number" placeholder="1" name="Quantity" ref={register({ required: true, min: 1, pattern: /^[1-9]*$/i })} />
                <input className=" hidden"
                    value={productID}
                    readOnly={true}
                    name="productID" ref={register({ required: true })} />
            </div>
            <style jsx>{`
            input:disabled{
                background-color: hsla(120, 100%, 50%, 0.3);
            }
            `}</style>
        </form>
        <AddToCartReCaptcha
            formState={formState}
            errors={errors}
            addCompleteMess={addCompleteMess}
            addtoCartBtnContent={addtoCartBtnContent}
            // onSubmit={handleSubmit(onSubmit)}
            onVerifyCaptcha={onVerifyCaptcha}
        />
    </>
    );
}

export default QuantityInputModal;