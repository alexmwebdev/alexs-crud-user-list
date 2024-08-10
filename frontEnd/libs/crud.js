import { fetchCreate, fetchDelete, fetchUsers, fetchUpdate } from './fetch.js';
import { createAlert } from './alert/createAlert.js';
import { removeRowAnimation } from './alert/animations.js';
import { destroyContentDiv } from './dom.js';
import generateSuccesModalContent from './modal/succesContent.js';
import {
  emptyNewUserForm,
  checkEmptyInputs,
  removeAllWarningBorders,
  addWarningBorder,
  emptyformObject,
} from './newUserFormHandler.js';

// Show all users
export async function getUsers() {
  const response = await fetchUsers();
  return response;
}

// Display the new user
export async function createUser(formObject) {
  const unfilledInputs = checkEmptyInputs();
  if (!unfilledInputs) {
    const response = await fetchCreate(formObject);
    const { firstName, lastName } = response.payload;
    removeAllWarningBorders();
    emptyNewUserForm();
    createAlert(`🎉 User ${firstName} ${lastName} created`, 'success-color');
    emptyformObject();
  } else {
    addWarningBorder(unfilledInputs);
    createAlert(`All fields in this form are mandatory`, 'alert-color');
  }
}

// Update user details
export async function updateUser(updateUserParams) {
  const [id, UpdateBody, modalBox, modalContainer, modalContent] =
    updateUserParams;
  const response = await fetchUpdate(id, UpdateBody);
  destroyContentDiv(modalBox, modalContent);
  //Create a new modal content with a success msg.
  generateSuccesModalContent(modalBox, modalContainer);
  return response;
}

// Delete user by id
export async function deleteUser(id) {
  const response = await fetchDelete(id);
  const tableRows = document.querySelector('.table-rows');
  //Invoke an animation that fade out and remove the row that has been deleted.
  removeRowAnimation(id, tableRows);
  //Show an alert showing a confirmation the user has been deleted
  createAlert(`🗑️ ${response.payload}`, 'success-color');
}
