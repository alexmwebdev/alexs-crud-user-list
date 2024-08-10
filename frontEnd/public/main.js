import { getUsers } from '../crud.js';
import * as mainUtils from '../mainUtils.js';

async function runApp() {
  //Show all users
  const usersList = await getUsers();
  //Order the user by id
  const usersListById = mainUtils.orderFetchUsersById(usersList.payload);
  // Create the rows of the user table
  mainUtils.mapUsersList(usersListById);
  //Create Event Listeners for the inputs
  mainUtils.createEventListeners();
}

//Run the website
runApp();
