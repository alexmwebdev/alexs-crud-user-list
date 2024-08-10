import closeModal from './close.js';
import { createDomElement } from '../dom.js';

export default function generateSuccesModalContent(modalBox, modalContainer) {
  const modalContentSuccess = createDomElement('div', null, {
    class: 'modal-content',
  });
  modalBox.appendChild(modalContentSuccess);

  const successMsg = createDomElement('h2', 'The user details has been updated', null);
  modalContentSuccess.appendChild(successMsg);

  const closeButton = createDomElement('button', 'Close', {
    class: 'button-modal',
    id: 'close-button',
  });

  const closeModalParams = [modalBox, modalContentSuccess, modalContainer];
  closeButton.addEventListener('click', () => closeModal(closeModalParams));
  modalContentSuccess.appendChild(closeButton);
}
