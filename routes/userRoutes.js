const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authToken = require('../middleware/authToken');

// *POST /api/users/register*: Allows a new user to create an account.
router.post('/register', userController.register);

// *POST /api/users/login*: Authenticates an existing user.
router.post('/login', userController.login);

// *GET /api/users/details*: Retrieves the details of the logged-in user.
router.get('/details', authToken, userController.getUserDetails);

// *PUT  /api/users/update*:  Allows a user to update their profile details.
router.put('/update', authToken, userController.updateUser);

// *DELETE /api/users/delete*:  Allows a user to permanently delete their account.
router.delete('/delete', authToken, userController.deleteUser);

// *POST /api/users/logout*: Logs out the user, invalidating their current authentication token.
router.post('/logout', authToken, userController.logout);


module.exports = router;