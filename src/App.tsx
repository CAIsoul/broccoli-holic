import { useContext, useRef } from 'react'
import { ModalContext } from './shared/context/ModalContext'
import RequestForm, { RequestInviteFormRef } from './components/Modal/RequestInvite/RequestForm';
import { api } from './services/ApiService';

import './App.scss'

function App() {
  const { openModal, closeModal } = useContext(ModalContext);
  const formRef = useRef<RequestInviteFormRef>(null);

  function openRequestInviteForm() {
    openModal({
      title: 'Request an invite',
      applyBtnLabel: 'Send',
      content: <RequestForm ref={formRef} />,
      closeOnOverlay: false,
      onApply: async function requestInvite() {
        try {
          if (!formRef?.current) {
            return;
          }

          const { name, email } = formRef.current.getFormData();

          if (!name || !email) {
            return;
          }

          const res = await api.requestForInvite(name, email);
          console.log(res);
        }
        catch (error) {

        }
      }
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
