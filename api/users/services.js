import { User } from '../../db/models/users.js';
import { validateBody } from './validators.js';

// Display all users
export async function getUsers() {
  try {
    const data = await User.findAll();
    return responseHandler(true, data);
  } catch (error) {
    throw new Error('Unable to get the users');
  }
}

// Retrieve user by id
export async function getUserByID(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return responseHandler(false, errorMsgNotExist(id));
    } else {
      return responseHandler(true, user);
    }
  } catch (error) {
    throw new Error('Unable to get the user');
  }
}

// Create new user
export async function createUser(newUser) {
  //Validate the body of the request
  const validationFails = validateBody(newUser);
  if (validationFails) return validationFails;

  //Destructuring the body
  const { firstName, lastName, email, description } = newUser;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      description,
    });
    return responseHandler(true, user);
  } catch (error) {
    return responseHandler(false, 'Unable to create the user');
  }
}

// Update user's details by id
export async function updateUserByID(id, updatedUser) {
  //Validate the body of the request
  const validationFails = validateBody(updatedUser);
  if (validationFails) return validationFails;

  //Convert the string id to a number
  let userId = Number(id);
  //Destructuring the body
  const { firstName, lastName, email, description } = updatedUser;

  try {
    // Update the user in the database
    const [numberOfAffectedRows, [updatedUser]] = await User.update(
      {
        firstName,
        lastName,
        email,
        description,
      },
      {
        where: { id: userId },
        returning: true,
      },
    );

    // Check if the update was successful
    if (numberOfAffectedRows === 0) {
      return responseHandler(false, `User with ID ${userId} not found.`);
    }
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Unable to update the user:', error);
    return responseHandler(false, 'Unable to update the user.');
  }
}

// Delete a user by id
export async function deleteUserByID(id) {
  //Convert the string id to a number
  let userId = Number(id);

  try {
    // Delete the user from the database
    const numberOfDestroyedRows = await User.destroy({
      where: { id: userId },
    });

    // Check if the delete was successful
    if (numberOfDestroyedRows === 0) {
      return responseHandler(true, `User with ID ${id} not found.`);
    }

    return responseHandler(true, `User with ID ${id} deleted`);
  } catch (error) {
    console.error('Unable to delete the user:', error);
    return responseHandler(false, 'Unable to delete the user.');
  }
}

const errorMsgNoBody = `The body can't be empty. An object with the fields: 'fist_name','last_name','email' and 'description' need to be send as body`;

function errorMsgNotExist(userId) {
  return `The user with id ${userId} does not exist.`;
}

export function responseHandler(status, statusMsg) {
  return {
    success: status,
    payload: statusMsg,
  };
}
