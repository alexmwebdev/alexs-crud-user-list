import { users } from '../mockData/users.js';
import { User } from '../models/users.js';

async function populateUsersTable() {
  const userData = users.map((user) => ({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    description: user.description,
  }));

  try {
    await User.bulkCreate(userData);
    console.log('Users have been inserted successfully.');
  } catch (error) {
    console.error('Unable to insert the users:', error);
  }
}

populateUsersTable();
