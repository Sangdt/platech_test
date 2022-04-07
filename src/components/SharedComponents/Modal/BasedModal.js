import useWindowSize from "@/Helper/useWindowSize";
import { useEffect } from "react";



const OverlayLayoutCloseButton = ({ closeModalFunction }) => {
    return (
        <div onClick={(e) => closeModalFunction(e)} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
            <span className="text-sm">(Esc)</span>
        </div>
    );
}

const ModalHeader = ({ ModalTitle, closeModalFunction }) => <div className="flex justify-between items-center pb-3">
    <p className="text-2xl  text-black font-bold">{ModalTitle}</p>
    <div onClick={(e) => closeModalFunction(e)} className="modal-close cursor-pointer z-50">
        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
    </div>
</div>

export const Modal = ({ children, leftButtonFunction,isOpen, LeftButtonchild, leftButtonContent, ToggleFunction, ModalTitle, nested = false }) => {
    const { height } = useWindowSize();
    // console.log("height",height <= 722)
    useEffect(() => {
        isOpen && ModalSideEffect(isOpen);
    }, [isOpen])
    return (//md:max-w-md
        <div
            className={`mt ${height < 722 && 'h-screen'} modal opacity-0 pointer-events-none fixed w-full 
            ${height > 723 && 'h-full'} top-0 left-0 flex items-center justify-center ${nested ? 'z-1001' : "z-1000"}`}>
            <div onClick={e => ToggleFunction(e)}
                className={`modal-overlay bg-local ${nested ? 'z-1002' : "z-1001"} absolute bg-gray-900 opacity-50`}></div>
            <div className={`modal-container border-gray-400 border ${height <= 722 && 'overflow-y-scroll overscroll-none'} ${height > 723 && 'lg:overflow-hidden'} ${height < 722 && 'h-screen'} bg-white w-11/12 mx-auto rounded shadow-lg ${nested ? 'z-1003' : "z-1002"}`}>
                <OverlayLayoutCloseButton closeModalFunction={ToggleFunction} />
                <div className="modal-content py-4 text-left px-6">
                    <ModalHeader ModalTitle={ModalTitle} closeModalFunction={ToggleFunction} />

                    {/** MODAL BODY */}
                    {children}
                    {/** MODAL BODY */}

                    <div className="flex justify-end pt-2">
                        {leftButtonFunction && <button onClick={async e => await leftButtonFunction(e)}
                            className="px-4 bg-transparent p-3 rounded-lg text-red-500 hover:bg-red-400 hover:text-white mr-2">
                            {leftButtonContent ? leftButtonContent : "Action"}
                            {LeftButtonchild && <LeftButtonchild />}
                        </button>}
                        <button onClick={e => ToggleFunction(e)}
                            className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" >
                            Đóng cửa sổ này
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * THIS MEAN TO RUN IN useEffect only
 */
export function ModalSideEffect(isOpen) {
    const modal = document.querySelector('.modal');
    const body = document.body;
    if (isOpen) {
        if (modal) {
            modal.classList.remove('opacity-0');
            modal.classList.remove('pointer-events-none');
        }
        body.classList.add('modal-active');
    } else {
        if (modal) {
            console.log("Off", isOpen)
            modal.classList.add('opacity-0');
            modal.classList.add('pointer-events-none');
        }
        body.classList.remove('modal-active');

    }
}