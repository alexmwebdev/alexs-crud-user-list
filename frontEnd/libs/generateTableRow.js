import { createDomElement } from '../dom.js';
import modal from '../modal/open.js';
import { deleteUser } from './crud.js';
import avatar from './avatarGenerator.js';

const tableRows = document.querySelector('.table-rows');

export function generateTableRow(
  id,
  firstName,
  lastName,
  email,
  description,
  timestamp
) {
  //ROW THAT CONTAINS ALL THE COLUMNS
  const divRow = createDomElement('div', null, {
    class: 'row',
    id: `row-${id}`,
  });
  //COLUMN WITH THE AVATAR that contains the user's initials
  const columnAvatar = createDomElement('div', avatar([firstName, lastName]), {
    class: `w-3 avatar`,
  });
  // Name Column
  const columnName = createDomElement('div', firstName, {
    class: `w-12 bold`,
  });
  // Last Name column
  const columnLastName = createDomElement('div', lastName, {
    class: `w-15 bold`,
  });
  // Email column
  const columnEmail = createDomElement('div', email, {
    class: `w-25 bold`,
  });
  //Column that contains the description and the update and delete buttons
  const lastColumn = createDomElement('div', null, {
    class: `table-rows-row with-buttons w-45`,
  });

  // Append the div contains with data of the users
  tableRows.appendChild(divRow);
  divRow.appendChild(columnAvatar);
  divRow.appendChild(columnName);
  divRow.appendChild(columnLastName);
  divRow.appendChild(columnEmail);

//Create last column content:
  addLastColumnContent(
    divRow,
    lastColumn,
    description,
    id,
    firstName,
    lastName,
    email,
    timestamp
  );
}

//Create last column content:
function addLastColumnContent(
  divRow,
  lastColumn,
  description,
  id,
  firstName,
  lastName,
  email,
  timestamp
) {
  //Create the description column
  const columndescription = createDomElement('div', description, {
    class: `w-70 bold`,
  });

  //Create the update button
  const updateButton = createDomElement('button', 'Update', {
    class: `w-15 align-end small-button success-color`,
    id: `row-${id}`,
  });

  //Add event listener to the button
  updateButton.addEventListener('click', () =>
    modal(id, description, firstName, lastName, email, timestamp)
  );

  //Create the delete button
  const deleteButton = createDomElement('button', 'Delete', {
    class: `w-15 align-end small-button alert-color`,
    id: `row-${id}`,
  });
  lastColumn.appendChild(columndescription);
  lastColumn.appendChild(updateButton);
  lastColumn.appendChild(deleteButton);

  //Add event listener to the buttons
  deleteButton.addEventListener('click', () => deleteUser(id));
  return divRow.appendChild(lastColumn);
}
