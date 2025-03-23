import { Component, createContext } from "react";
import Modal, { ModalProps } from "../../components/Modal/BaseModal/Modal";

interface ContextProps {
    openModal?: any;
    closeModal?: any;
    setInProgressState?: any;
    setApplyError?: any;
}

interface ModalState {
    modalData: ModalProps;
    isModalOpen: boolean;
}

const defaultModalProps: ModalProps = {
    isOpen: false,
    title: '',
    children: '',
    isInProgress: false,
    closeOnOverlay: false,
    applyBtnLabel: 'Apply',
    applyBtnInProgresLabel: 'Applying',
    applyBtnErrorLabel: '',
    onApply: null,
    onCancel: null,
};

export const ModalContext = createContext<ContextProps>({});

// ModalProvider Class Component
export class ModalProvider extends Component<ModalProps, ModalState>{
    constructor(props: ModalProps) {
        super(props);

        // Initialize state
        this.state = {
            modalData: defaultModalProps,
            isModalOpen: false,
        };

        // Bind methods to `this`
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setInProgressState = this.setInProgressState.bind(this);
        this.setApplyError = this.setApplyError.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // Method to open the modal
    openModal(options: any) {
        this.setState({
            modalData: {
                ...defaultModalProps,
                ...options,
            },
            isModalOpen: true,
        });
    }

    // Method to close the modal
    closeModal() {
        this.setState({
            isModalOpen: false,
            modalData: defaultModalProps,
        });
    }

    // Method to set the in-progress state
    setInProgressState(isInProgress: boolean) {
        this.setState((prevState) => ({
            modalData: {
                ...prevState.modalData,
                isInProgress,
            },
        }));
    }

    // Method to set the apply error
    setApplyError(error: string) {
        this.setState((prevState) => ({
            modalData: {
                ...prevState.modalData,
                applyBtnErrorLabel: error,
            },
        }));
    }

    // Method to handle the apply action
    handleApply() {
        const { modalData } = this.state;
        if (typeof modalData.onApply === 'function') {
            modalData.onApply();
        } else {
            this.setState({ isModalOpen: false });
        }
    }

    // Method to handle the cancel action
    handleCancel() {
        const { modalData } = this.state;
        if (typeof modalData.onCancel === 'function') {
            modalData.onCancel();
        } else {
            this.setState({ isModalOpen: false });
        }
    }

    render() {
        const { modalData, isModalOpen } = this.state;
        const { children } = this.props;

        return (
            <ModalContext.Provider
                value={{
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    setInProgressState: this.setInProgressState,
                    setApplyError: this.setApplyError,
                }}
            >
                <div className={`app-wrap ${isModalOpen ? 'modal-open' : ''}`}>
                    {children}
                </div>
                {
                    <Modal
                        isOpen={isModalOpen}
                        title={modalData.title}
                        isInProgress={modalData.isInProgress}
                        applyBtnLabel={modalData.applyBtnLabel}
                        applyBtnInProgresLabel={modalData.applyBtnInProgresLabel}
                        applyBtnErrorLabel={modalData.applyBtnErrorLabel}
                        closeOnOverlay={modalData.closeOnOverlay}
                        onApply={this.handleApply}
                        onCancel={this.handleCancel}
                    >
                        {modalData.children}
                    </Modal>
                }
            </ModalContext.Provider>
        );
    }
}