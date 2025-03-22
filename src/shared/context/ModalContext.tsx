import { createContext, useState } from "react";
import Modal, { ModalProp } from "../../components/Modal/BaseModal/Modal";

interface ContextProps {
    openModal?: any;
    closeModal?: any;
}

export const ModalContext = createContext<ContextProps>({});
export const ModalProvider = ({ children }: any) => {
    const [modalState, setModalState] = useState<ModalProp>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (options: any) => {
        const { title, content,
            closeOnOverlay = false, applyBtnLabel = 'Apply',
            onApply, onCancel } = options;

        setModalState({
            title: title,
            children: content,
            closeOnOverlay: closeOnOverlay,
            applyBtnLabel: applyBtnLabel,
            onApply: onApply,
            onCancel: onCancel,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalState(undefined);
    };

    function handleApply() {
        if (typeof modalState?.onApply === 'function') {
            modalState?.onApply();
        } else {
            setIsModalOpen(false);
        }
    }

    function handleCancel() {
        if (typeof modalState?.onCancel === 'function') {
            modalState?.onCancel();
        } else {
            setIsModalOpen(false);
        }
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            <div className={`app-wrap ${isModalOpen ? 'modal-oepn' : ''}`} >
                {children}
            </div>
            {
                modalState && isModalOpen && <Modal
                    title={modalState.title}
                    applyBtnLabel={modalState.applyBtnLabel}
                    closeOnOverlay={modalState.closeOnOverlay}
                    onApply={handleApply}
                    onCancel={handleCancel}
                >
                    {modalState.children}
                </Modal>
            }
        </ModalContext.Provider>
    );
};