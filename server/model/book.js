const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    authur: {
        type: String,
        required: true
    },

    pages: {
        type: Number,
        required: true
    },

    isRead: {
        type: String,
        enum: ['Finished', 'Not Finished'],
        default: 'Finished'
    }
})

const Books = mongoose.model('Book', bookSchema);
module.exports = Books;