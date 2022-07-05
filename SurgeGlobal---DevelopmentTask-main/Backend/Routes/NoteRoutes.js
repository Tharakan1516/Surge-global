const express = require('express');
const router = new express.Router();
const { createNote, getNotes, getNoteById,updateNote, deleteNote, getNoteByEmail } = require('../Controller/NotesController');

router.post('/', createNote);
router.get('/all', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/', getNoteByEmail);

module.exports = router;