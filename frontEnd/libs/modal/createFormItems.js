import closeModal from './close.js';
import { createDomElement } from '../dom.js';
import { updateUser } from '../crud.js';

let UpdateBody = {};

//Create fields for the Update user form
export function createFormItems(
  id,
  description,
  firstName,
  lastName,
  email,
  modalContent,
  modalBox,
  modalContainer,
  timestamp,
) {
  const modalInputNodes = [
    { id: 'firstName', value: firstName, label: 'Name' },
    { id: 'lastName', value: lastName, label: 'Last name' },
    { id: 'email', value: email, label: 'Email' },
    { id: 'description', value: description, label: 'description' },
  ];
  createH1Title(firstName, modalContent);
  createUpdateTime(modalContent, timestamp);
  createFormInputs(modalInputNodes, modalContent);
  createButtons(id, modalContent, modalBox, modalContainer);
}

//CREATE THE H1 TITLE
function createH1Title(firstName, modalContent) {
  const modalH1 = createDomElement(
    'h1',
    `Update info for the user ${firstName}`,
    null,
  );
  modalContent.appendChild(modalH1);
}

function createUpdateTime(modalContent, timestamp) {
  const formatTimeStamp = new Date(timestamp);
  const date = formatTimeStamp.toLocaleDateString('en-GB', {
    timeZone: 'UTC',
  });
  const time = formatTimeStamp.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
  });
}

//CREATE THE INPUTS
function createFormInputs(modalInputNodes, modalContent) {
  //CREATE THE INPUTS ELEMENTS
  modalInputNodes.map((inputElement) => {
    createInputsLabels(inputElement.id, inputElement.label, modalContent);
    const input = createDomElement('input', null, {
      id: inputElement.id,
      class: 'input-modal',
      value: inputElement.value,
      type: 'text',
    });
    modalContent.appendChild(input);
    //WHEN CREATE THE INPUTS, WE FILL THE UPDATE BODY OBJECT WITH THE CURRENT INPUTS INFORMATION
    UpdateBody = { ...UpdateBody, [inputElement.id]: inputElement.value };
    //ADD EVENT LISTENER TO EVERY INPUT
    input.addEventListener('keyup', (e) => updatePutBody(e, inputElement.id));
  });
}

//UPDATE BODY VALUES OBJECT WHEN INPUT CHANGES
function updatePutBody(e, key) {
  let value = e.target.value;
  return (UpdateBody[key] = value);
}

//Create input labels
function createInputsLabels(id, label, modalContent) {
  const labelInputName = createDomElement('label', label, { htmlFor: id });
  modalContent.appendChild(labelInputName);
}

//CREATE THE BUTTONS CONTAINER AND BUTTONS
function createButtons(id, modalContent, modalBox, modalContainer) {
  //Buttons container
  const buttonsContainer = createDomElement('div', null, {
    class: 'modal-buttons-container',
  });

  //Cancel button
  const buttonCancel = createDomElement('button', 'Cancel', {
    class: `modal-buttons cancel`,
    id: 'cancel-button',
  });

  //Update button
  const buttonUpdate = createDomElement('button', 'Update', {
    class: `modal-buttons confirm`,
    id: 'update-button',
  });

  appendTheButtons(modalContent, buttonsContainer, buttonCancel, buttonUpdate);
  createEventListeners(
    id,
    modalContent,
    modalBox,
    modalContainer,
    buttonCancel,
    buttonUpdate,
  );
}

function appendTheButtons(
  modalContent,
  buttonsContainer,
  buttonCancel,
  buttonUpdate,
) {
  //Append buttons
  modalContent.appendChild(buttonsContainer);
  buttonsContainer.appendChild(buttonCancel);
  buttonsContainer.appendChild(buttonUpdate);
}

function createEventListeners(
  id,
  modalContent,
  modalBox,
  modalContainer,
  buttonCancel,
  buttonUpdate,
) {
  const updateUserParams = [
    id,
    UpdateBody,
    modalBox,
    modalContainer,
    modalContent,
  ];

  const closeModalParams = [modalBox, modalContent, modalContainer];

  //Add event listeners
  buttonUpdate.addEventListener('click', () => updateUser(updateUserParams));
  buttonCancel.addEventListener('click', () => closeModal(closeModalParams));
}
