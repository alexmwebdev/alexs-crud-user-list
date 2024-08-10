import express from 'express';
const router = express.Router();
import {
  getUserByID,
  getUsers,
  createUser,
  updateUserByID,
  deleteUserByID,
} from './services.js';

// Get all users
router.get('/users', async function (req, res) {
  //Call the function to get the users
  const result = await getUsers();
  //Return the response
  res.json(result);
});

// Get user by id
router.get(`/users/:id`, async function (req, res) {
  //Get the id from the params
  const id = req.params.id;
  //Call the function to get the user by Id
  const resultbyId = await getUserByID(id);
  //Return the response
  res.json(resultbyId);
});

// Create new user
router.post(`/users`, async function (req, res) {
  //Get the body from the params
  const postBody = req.body;
  //Call the function to add the new user
  const newUser = await createUser(postBody);
  //Return the response
  res.json(newUser);
});

//Update user's details by id
router.put('/users/:id', async function (req, res) {
  //Get the body from the params
  const body = req.body;
  //Get the id
  const id = req.params.id;
  //Call the function to add the new user
  const updateUser = await updateUserByID(id, body);
  //Return the response
  res.json(updateUser);
});

//Delete user by id
router.delete('/users/:id', async function (req, res) {
  //Get the id
  const id = req.params.id;
  //Call the function to add the new user
  const deleteUser = await deleteUserByID(id);
  //Return the response
  res.json(deleteUser);
});

export default router;
