import { useEffect, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { FaCartArrowDown,FaCheckCircle,FaTrashAlt } from "react-icons/fa";

import { Spinner } from './PageLoader';
import { useUser } from '@/Helper/auth/useUser';

const AddtoCartCaptchaButton = ({ onVerifyCaptcha, isSubmitting, isSubmitted, errors, addCompleteMess, addtoCartBtnContent }) => {
  const [showLoader, setShowloader] = useState(false);
  const [submitComplete, setSubmitComplete] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const clickHandler = async (e) => {
    // console.log("Vaild",errors)
    e.persist();
    if (!executeRecaptcha) { 
      return;
    }
    setShowloader(true);

    const token = await executeRecaptcha('CartSubmit');
    //   console.log("token",token)
    onVerifyCaptcha(token, e);

  };
  useEffect(() => {
    let timer1;
    let timer2;
    if (isSubmitted) {
      //  console.log("DONE SUBMITTED",errors.Quantity)
      timer1 = setTimeout(() => !(errors && errors.Quantity) && setShowloader(false), 2000);
      timer2 = setTimeout(() => !(errors && errors.Quantity) && setSubmitComplete(true), 2000);

    }
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [isSubmitted])

  useEffect(() => {
    if (errors && errors.Quantity) {
      setShowloader(false);
    }
  }, [errors]);
  return (
    <button
      disabled={showLoader || submitComplete}
      //style={{ marginLeft: "20px", marginTop: "25px", }}
      className="cursor-pointer flex text-2xl shadow bg-red-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold px-2 rounded"
      onClick={async e => await clickHandler(e)}
      type="submit"
    >
      {submitComplete ? <> {addCompleteMess ? addCompleteMess : "Thêm thành công"}
        <FaCheckCircle style={{ marginLeft: "5px", marginTop: "5px", }} />
      </> :
        <>{addtoCartBtnContent ? addtoCartBtnContent : "THÊM VÀO GIỎ"} <FaCartArrowDown className=" mt-2" />
          {(isSubmitting || showLoader) && <Spinner style={{ marginLeft: "10px", marginTop: "10px", }} />}
        </>
      }
    </button>
  );
};

export const AddToCartReCaptcha = ({ onVerifyCaptcha, formState, errors, addCompleteMess, addtoCartBtnContent }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      language={'vi'}
    >
      <AddtoCartCaptchaButton
        errors={errors}
        addCompleteMess={addCompleteMess}
        addtoCartBtnContent={addtoCartBtnContent}
        onVerifyCaptcha={onVerifyCaptcha}
        {...formState} />
    </GoogleReCaptchaProvider>
  );
}

const DeleteBtn = ({ setUpdated, productID, onVerifyCaptcha, addCompleteMess, actionBtnContent }) => {
  const [showLoader, setShowloader] = useState(false);
  const [submitComplete, setSubmitComplete] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { user } = useUser()
  const clickHandler = async (e) => {
    // console.log("Vaild", user)
    e.persist();
    if (!executeRecaptcha) {
      return;
    }
    setShowloader(true);

    const token = await executeRecaptcha('CartSubmit');
    //   console.log("token",token)
    await onVerifyCaptcha(productID, user.token, token);
    setTimeout(() => {
      setShowloader(false);
      setSubmitComplete(true);
      setUpdated(true);
    }, 2000)

  };
  return <button disabled={submitComplete || showLoader}
    onClick={e => clickHandler(e)} className=" flex shadow bg-red-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-black font-bold px-2 py-2 rounded">
    {submitComplete ? <> {addCompleteMess ? addCompleteMess : "Xóa thành công"}
      <FaCheckCircle style={{ marginLeft: "5px", marginTop: "5px", }}/>
    </> : <> {actionBtnContent ? actionBtnContent : "xóa"}<FaTrashAlt className="mt-1 ml-2 " />
        {showLoader && <Spinner style={{ marginLeft: "10px" }} />}

      </>}
  </button>
}
export const DeleteCartBtn = ({ setUpdated, productID, onVerifyCaptcha, addCompleteMess, actionBtnContent }) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
    language={'vi'}
  >
    <DeleteBtn
      setUpdated={setUpdated}
      addCompleteMess={addCompleteMess}
      productID={productID}
      onVerifyCaptcha={onVerifyCaptcha}
      actionBtnContent={actionBtnContent}
    />
  </GoogleReCaptchaProvider>
)