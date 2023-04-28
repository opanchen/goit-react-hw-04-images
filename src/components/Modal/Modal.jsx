// import { useEffect, useRef } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, alt, largeImageURL}) => {

//    const firstRender = useRef(true);

    useEffect(() => {

        // if (firstRender.current) {
        //     firstRender.current = false;
        //     return;
        // }

        const handleKeyDown = (e) => {
            if (e.code === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose])

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) onClose();
    }

    return createPortal(
        <div className={css.overlay} onClick={handleBackdropClick} >
            <div className={css.modal}>
                <img src={largeImageURL} alt={alt}/>
            </div>
        </div>, modalRoot
    )

}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}



