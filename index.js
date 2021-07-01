
require("dotenv").config();


///frame work
const express = require("express");

const mongoose = require("mongoose");


//database
const database = require("./database");


//initializing express
const booky = express();

//configuration
booky.use(express.json());



//----------------------------- Model ----------------------------------------------


const BookModel = require("./book");

const AuthorModel = require("./author");

const PublicationModel = require("./publication");






console.log(process.env.MONGO_URL);

mongoose
.connect(process.env.MONGO_URL,
{

    useNewUrlParser: true,
    useUnifiedTopology : true,
    useFindAndModify: false,
    useCreateIndex: true

})

.then(() => console.log("connection established!!!!!!!"));


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

Route                 / is
Description           Get Specific book based on ISBN
Access                PUBLIC
Parameter             isbn
Methods               GET

*/

booky.get("/is/:isbn",async(req,res)=>{

    const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn}); 

    if(!getSpecificBook){
         
        return res.json({error : `no book found ${req.params.isbn}`,});

    }

    return res.json({book : getSpecificBook});

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



//--------------------------add a book



booky.put("/book/new", async(req,res)=>{
 

   const {newBook} = req.body;
    
   
   



});



/*

Route                 / 
Description           to get all author
Access                public
Parameter             NONE
Methods               GET

*/


booky.get("/author",(req,res)=>{

return res.json({data: database.author})

});

/*

Route                 /author/book/:isbn
Description           to get author with based on id
Access                public
Parameter             isbn
Methods               GET

*/

booky.get("/author/book/:isbn",(req,res)=>{
 
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn)
    
    );


    if(getSpecificAuthor.length === 0 ){

        return res.json({error : `no author is found ${req.params.isbn}`});
    }


    return res.json({author : getSpecificAuthor});

});


/*

Route                 /author/book/:isbn
Description           to get author with based on id
Access                public
Parameter             isbn
Methods               GET

*/

booky.get("/lang/:language",(req,res) => {


const GetSpecificLang = database.books.filter((books)=> books.language.includes(req.params.language)
);

if(GetSpecificLang === 0){

    res.json({error : `language no found ${req.params.language}` });
}

else{


    res.json({book: GetSpecificLang});
}





});







booky.get("/publication",(req,res)=>{

   const getPublication = database.publication;


if(getPublication === 0){

res.json({error: `publication no found ${req.params.publication}`})


}else{

  
    res.json({publication : getPublication});

}





});



//----------------------------------------------post---------------------------------

/*

Route                 /book/add
Description           add new book
Access                public
Parameter             none
Methods               POST

*/


booky.post("/book/add",(req,res)=>{

//    console.log(req.body);

           const {newBook}= req.body;
                  
            database.books.push(newBook);

            return res.json({books: database.books})


                
});



//----------------push the new author -------------------------------------------/ 

/*

Route                 /book,add
Description           add new Author
Access                public
Parameter             none
Methods               POST

*/

booky.post("/author/add",(req,res)=>{

     const { newAuthor } = req.body;

     database.author.push(newAuthor);

return res.json({ author : database.author});


});






//----------------------------------------------Push the publication---------------------------------/

/*

Route                 /publication/add
Description           add new Publication
Access                public
Parameter             none
Methods               POST

*/

booky.post("/publication/add",(req,res)=>{

  const { newPublication } = req.body;

  database.publication.push(newPublication);

  return res.json({publication : database.publication});

});




/*---------------------------------------------------------put-------------------------------------------------*/


//---------------------------------update a book title ------------------------------

/*

Route                 /book/update/title
Description           update  BOOK attribue or data
Access                public
Parameter             isbn
Methods               PUT

*/


booky.put("/book/update/title/:isbn",(req,res)=>{


// forEach
// it updating the main array and require data


// map

// it will create new object again and again



database.books.forEach((book) =>{


if(book.ISBN === req.params.isbn){

book.title = req.body.newBookTitle;

return ;

}

});


res.json({book : database.books});

});



//--------------------update/add new author

/*

Route                 /book/update/title
Description           update  author attribue or add new  author
Access                public
Parameter             isbn
Methods               PUT

*/


booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
   

    //update book database...

database.books.forEach((book)=>{

    if(book.ISBN === req.params.isbn){
   
        return book.author.push(req.params.authorId);

    }


});


    //add author database for the book
   
database.author.forEach((author)=>{

    if(author.id === req.params.authorId)
    return author.books.push(req.params.isbn);

});



return res.json({books: database.books , author : database.author});


});



//--------------------update/add new book to a publicaion

/*

Route                 /publication/update/book
Description           update  add mew book to a publication
Access                public
Parameter             isbn
Methods               PUT

*/


booky.put("/publication/update/book/:isbn",(req,res)=>{

   //update th publication database
      database.publication.forEach((publication) => {


if(publication.id === req.body.pubId){

return  publication.books.push(req.params.isbn);

}

      });

//update the bood database

database.books.forEach((book)=>{

if(book.ISBN === req.params.isbn){

    book.publication= req.body.pubId;

    return;
}


});

return res.json({publication: database.publication, book : database.books});


});



/*

Route                 /book/delete
Description           delete a book
Access                public
Parameter             isbn
Methods               DELETE

*/


booky.delete("/book/delete/:isbn",(req,res)=>{

  const updateDatabase = database.books.filter((book)=> 

         book.ISBN !== req.params.isbn


  );


database.books = updateDatabase;

return res.json({books : database.books});


});




/*

Route                 /book/delete/author
Description           delete a author form a book
Access                public
Parameter             isbn
Methods               DELETE

*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{

    database.books.forEach((book)=>{

   if(book.ISBN === req.params.isbn){

  const newAuthorList = book.author.filter((author)=> 
  author !== parseInt(req.params.authorId)
  );
 
  book.author = newAuthorList;
  return;

   } 

   

});

database.author.forEach((author)=>{
 
    if(author.id === parseInt(req.params.authorId)){

 const newBookList = author.books.filter((book)=>
   book !== req.params.isbn
 );
 author.books = newBookList;
return;

    }

});

return res.json({Books : database.books , author: database.author });


});



/*

Route                 /book/delete/author
Description           delete a author
Access                public
Parameter             author
Methods               DELETE

*/


booky.delete("/author/delete/:authorId",(req,res)=>{

 const newBookdata =  database.author.filter((author)=>
  
 author.id !== parseInt(req.params.authorId) 

 );
     
database.author = newBookdata ;

return res.json({ book: database.books , author: database.author });

});




booky.listen(5050,() => console.log("hey server is running ")); 
