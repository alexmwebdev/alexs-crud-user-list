import { getAllElements } from './dom.js';
import { generateTableRow } from './generateTableRow.js';
import { updateFormObjectValues } from './newUserFormHandler.js';

//Order the users by id
export function orderFetchUsersById(payload) {
  return payload.sort(function (a, b) {
    return a.id - b.id || a.name.localeCompare(b.name);
  });
}

// map the user list by id and generate the table
export function mapUsersList(usersListById) {
  return usersListById.map((user) =>
    generateTableRow(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.catchphrase,
      user.timestamp,
    ),
  );
}

// Create the event listeners
export function createEventListeners() {
  const getAllInputs = getAllElements('.add-user-form-container', 'input');
  return getAllInputs.map((element) => {
    element.addEventListener('keyup', (e) =>
      updateFormObjectValues(e, element.id),
    );
  });
}
