//initialize mongoose
const mongoose = require("mongoose");

//Creating a book schema

const BookSchema = mongoose.Schema({

     
    ISBN: {

        type : String,
        required: true,
        minLength : 8,
        maxLength :10,
        
        },
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    category: [String],
    publication: Number,

});


// create a model

const BookModel = mongoose.model("books",BookSchema);


module.exports = BookModel;


