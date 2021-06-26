const express = require("express");

const database = require("./database");

const booky = express();


/*

Route                 / 
Description           to get all books
Access                public
Parameter             NONE
Methods               GET

*/

booky.get("/",(req, res)=>{

return res.json({books: database.books});


});



/*

Route                 / 
Description           Get Specific book based on ISBN
Access                PUBLIC
Parameter             isbn
Methods               GET

*/

booky.get("./is/isbn",(req,res)=>{

    const getSpecificBook = database.books.filter((book)=>book.ISBN === req.params.isbn);

    if(getSpecificBook.length === 0){
         
        return res.json({error : `no book found ${req.params.isbn}`})

    }

    return res.json({book:getSpecificBook});
});

/*

Route                 / 
Description           to get all books
Access                public
Parameter             NONE
Methods               GET

*/

booky.get("/c/:category",(req,res)=>{

    const getSpecificBook = database.books.filter((book) =>
     book.category.includes(req.params.category)
    );


    if(getSpecificBook.length === 0){
         
        return res.json({error : `no book found`})

    }
    return res.json({book:getSpecificBook});

});


/*

Route                 / 
Description           to get all books
Access                public
Parameter             NONE
Methods               GET

*/

booky.get("/author",(req,res)=>{

return res.json({data: database.author})

});

/*

Route                 / 
Description           to get all books
Access                public
Parameter             NONE
Methods               GET

*/

booky.get("/author/book/:isbn",(req,res)=>{

    const getSpecificAuthor = database.author.filter((author)=author.books.includes(req.params.isbn)
    
    );

    if(getSpecificAuthor.length === 0 ){

        return res.json({error : `no author is found ${req.params.isbn}`});
    }


    return res.json({authors : getSpecificAuthor});
});

booky.listen(5050,() => console.log("hey server is running ")); 