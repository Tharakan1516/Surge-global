const mongoose = require('mongoose');

const Notes = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("Notes", Notes);