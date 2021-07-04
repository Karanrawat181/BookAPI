
//initiailizing router

const Router = require("express").Router();


//database model


const BookModel = require("../../book");


//_________________________________________________________________________________________________________

/*

Route                 / 
Description           to get all books
Access                public
Parameter             NONE
Methods               GET

*/


Router.get("/", async (req, res) => {


    const getAllBooks = await BookModel.find();


    return res.json({ getAllBooks });


});


/*

Route                 / is
Description           Get Specific book based on ISBN
Access                PUBLIC
Parameter             isbn
Methods               GET

*/

Router.get("/is/:isbn", async (req, res) => {

    try{

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {

        return res.json({ error: `no book found ${req.params.isbn}`, });

    }

    return res.json({ book: getSpecificBook });
    }catch(error){

        return res.json({error : error.message});
    }
});




/*

Route                 / 
Description           to get books n=based on category
Access                public
Parameter             NONE
Methods               GET

*/



Router.get("/c/:category", async (req, res) => {


try{
    const getSpecificBooks = await BookModel.findOne({

        category: req.params.category
    });


    if (!getSpecificBooks) {

        return res.json({ error: `no book found` })

    }

    return res.json({ book: getSpecificBooks });
}catch(error){

    return res.json({error : error.message});
}


});


//___________________________________________________Add a Book______________________________________________



Router.post("/new", async (req, res) => {

    try {

        const { newBook } = req.body;

        await BookModel.create(newBook);

        return res.json({ message: "bookwas added" });

    } catch (error) {

        return res.json({ error: error.message });

    }
});




//---------------------------------update a book title -----------------------------------------------------

/*

Route                 /book/update/title
Description           update  BOOK attribue or data
Access                public
Parameter             isbn
Methods               PUT

*/


Router.put("/update/title/:isbn", async (req, res) => {

    try {

        const updatedBook = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn },

            {

                title: req.body.bookTitle,

            },
            {
                new: true,
            }

        );

        return res.json({ books: updatedBook });

    } catch (error) {

        return res.json({ error: error.message })

    }

});


/*-----------------------------------delete_________________________________________________________________

Route                 /book/delete
Description           delete a book
Access                public
Parameter             isbn
Methods               DELETE

*/


Router.delete("/book/delete/:isbn", async (req, res) => {

    const updateBookDatabase = await BookModel.findOneAndDelete({ ISBN: req.params.isbn })


    return res.json({ books: updateBookDatabase });


});



/*

Route                 /book/delete/author
Description           delete a author form a book
Access                public
Parameter             isbn
Methods               DELETE

*/
Router.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {


    const updateBook = await BookModel.findOneAndUpdate({

        ISBN: req.params.isbn,

    },
        {

            $pull: {

                author: parseInt(req.params.authorId),

            },

        },
        {

            new: true,

        });



    const updateAuthor = await AuthorModel.findOneAndUpdate({

        id: parseInt(req.params.authorId),

    },
        {

            $pull: {

                books: req.params.isbn,
            },

        },
        {

            new: true
        });



    return res.json({ boook: updateBook, author: updateAuthor });


});



module.exports = Router;