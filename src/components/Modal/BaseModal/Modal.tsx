import React from "react";

import './Modal.scss';

export interface ModalProps {
    isOpen: boolean;
    title: string;
    children: any;
    closeOnOverlay: boolean;
    isInProgress: boolean;
    applyBtnLabel: string;
    applyBtnInProgresLabel: string;
    applyBtnErrorLabel: string;
    onApply: any;
    onCancel: any;
}

const Modal: React.FC<ModalProps> = (props) => {
    let { isOpen, title, children, isInProgress,
        closeOnOverlay, applyBtnLabel, applyBtnInProgresLabel,
        applyBtnErrorLabel, onApply, onCancel } = props;

    function handleOverlayMouseDown(evt: any) {
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