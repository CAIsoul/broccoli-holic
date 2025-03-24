import React from "react";

import './Modal.scss';

export interface ModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    closeOnOverlay: boolean;
    isInProgress: boolean;
    applyBtnLabel: string;
    applyBtnInProgresLabel: string;
    applyBtnErrorLabel: string;
    onApply: any;
    onCancel: any;
}

const Modal: React.FC<ModalProps> = (props) => {
    const { isOpen, title, children, isInProgress,
        closeOnOverlay, applyBtnLabel, applyBtnInProgresLabel,
        applyBtnErrorLabel, onApply, onCancel } = props;

    function handleOverlayMouseDown(_: any) {
        if (closeOnOverlay) {
            onCancel();
        }
    }

    function handleModalMouseDown(evt: any) {
        evt.stopPropagation();
    }

    function handleApplyClick() {
        if (isInProgress) {
            return;
        }

        onApply();
    }

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''} ${isInProgress ? 'in-progress' : ''}`}
            role="dialog"
            onMouseDown={handleOverlayMouseDown}
        >
            <div className="modal-container" onMouseDown={handleModalMouseDown}>
                <h4>{title}</h4>
                {children}
                <button onClick={handleApplyClick}>
                    {isInProgress ? applyBtnInProgresLabel : applyBtnLabel}
                </button>
                {applyBtnErrorLabel && <div className="apply-result">{applyBtnErrorLabel}</div>}
            </div>
        </div>
    );
}

export default Modal;