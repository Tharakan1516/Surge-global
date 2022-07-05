const express = require('express');
const router = new express.Router();
const { createUser, getUsers, getUserById, updateUser, loginUser } = require('../Controller/UserController');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.post('/signin', loginUser);

module.exports = router;

