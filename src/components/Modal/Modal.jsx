import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Overlay, ModalBox } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
            
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleOverlayClick}>
            <ModalBox>
                {children}
            </ModalBox>
        </Overlay>,
        modalRoot,
    );
};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;