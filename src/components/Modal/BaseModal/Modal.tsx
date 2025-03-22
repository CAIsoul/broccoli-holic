import React from "react";

import './Modal.scss';

export interface ModalProp {
    title: string;
    children: any;
    closeOnOverlay: boolean;
    applyBtnLabel: string;
    onApply: any;
    onCancel: any;
}

const Modal: React.FC<ModalProp> = (props) => {
    let { title, children,
        closeOnOverlay, applyBtnLabel,
        onApply, onCancel } = props;

    function handleOverlayClick(evt: any) {
        if (closeOnOverlay) {
            onCancel();
        }
    }

    function handleModalClick(evt: any) {
        evt.stopPropagation();
        evt.preventDefault();
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container" onClick={handleModalClick}>
                <h4>{title}</h4>
                {children}
                <button onClick={onApply}>
                    {applyBtnLabel}
                </button>
            </div>
        </div>
    );
}

export default Modal;