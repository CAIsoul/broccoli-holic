import { useContext, useRef } from 'react'
import { ModalContext } from './shared/context/ModalContext'
import RequestForm, { RequestInviteFormRef } from './components/Modal/RequestInvite/RequestForm';
import { api } from './services/ApiService';

import './App.scss'

function App() {
  const { openModal, closeModal, setInProgressState, setApplyError } = useContext(ModalContext);
  const formRef = useRef<RequestInviteFormRef>(null);

  function openRequestInviteForm() {
    openModal({
      title: 'Request an invite',
      applyBtnLabel: 'Send',
      applyBtnInProgresLabel: 'Sending, please wait...',
      children: <RequestForm ref={formRef} />,
      closeOnOverlay: true,
      onApply: async function requestInvite() {
        try {
          if (!formRef?.current) {
            return;
          }

          const { name, email, allValid } = formRef.current.getFormData();

          if (!allValid) {
            return;
          }

          setApplyError('');
          setInProgressState(true);
          const res = await api.requestForInvite(name, email);

          if (res === true) {
            closeModal();
            openRequestCompleteModal();
          }

        }
        catch (error: any) {
          setApplyError(error.response?.data?.errorMessage ?? error.message);
        }

        setInProgressState(false);
      }
    });
  }

  function openRequestCompleteModal() {
    openModal({
      title: 'All done!',
      applyBtnLabel: 'OK',
      children: <div style={{ marginBottom: '10px', textAlign: 'center' }}>You will be one of the first to experience<br /> Broccoli & Co. when we launch.</div>,
      closeOnOverlay: true,
    });
  }

  return (
    <>
      <header>
        <h2>BROCCOLI & CO.</h2>
      </header>
      <main>
        <h1>A better way <br /> to enjoy every day.</h1>
        <div>Be the first to know when we launch.</div>
        <button onClick={openRequestInviteForm}>Request an invite</button>
      </main>
      <footer>
        <div>Made with 🩶 in Melbourne.</div>
        <div>© 2016 Broccoli & Co. All rights reserved.</div>
      </footer>
    </>
  )
}

export default App
