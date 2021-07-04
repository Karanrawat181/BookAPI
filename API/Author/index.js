const Router = require("express").Router();


const AuthorModel = require("../../author");

//____________________________________________________________________________________________________________________



/*

Route                 / 
Description           to get all author
Access                public
Parameter             NONE
Methods               GET

*/


Router.get("/", async (req, res) => {

    const GetAuthors = await AuthorModel.find();

    return res.json({ data: GetAuthors });


});




/*

Route                 /author/book/:isbn
Description           to get author with based on id
Access                public
Parameter             isbn
Methods               GET

*/

Router.get("/lang/:language", async (req, res) => {

    const getSpecificLang = await BookModel.findOne({ language: req.params.language });


    if (!getSpecificLang) {

        return res.json({ error: `no author is found ${req.params.isbn}` });
    }


    return res.json({ author: getSpecificLang });

});


/*

Route                 /author/book/:isbn
Description           to get author with based on id
Access                public
Parameter             isbn
Methods               GET

*/

Router.get("/book/:isbn", async (req, res) => {


    const GetSpecificBook = await AuthorModel.findOne({ books: req.params.isbn });

    if (GetSpecificBook === 0) {

        res.json({ error: `BOOK not found ${req.params.isbn}` });
    }

    else {

        res.json({ book: GetSpecificBook });
    }

});



//----------------push the new author -------------------------------------------/ 

/*

Route                 /book,add
Description           add new Author
Access                public
Parameter             none
Methods               POST

*/

Router.post("/new", async (req, res) => {

    const { newAuthor } = req.body;

    AuthorModel.create(newAuthor);

    return res.json({ message: " author added" });


});





/*---------------------------------------------------------put-------------------------------------------------*/


//--------------------update/add new author

/*

Route                 author/update/title
Description           update  author attribue or add new  author
Access                public
Parameter             isbn
Methods               PUT

*/

Router.put("/update/:isbn", async (req, res) => {


    //update book database...

    const updateBook = await BookModel.findOneAndUpdate({


        ISBN: req.params.isbn,

    },
        {

            $addToSet: {

                author: req.body.newAuthor,

            },

        },
        {
            new: true

        }
    );

    const updateAuthor = await AuthorModel.findOneAndUpdate({


        id: req.body.newAuthor,


    },
        {

            $addToSet: {


                books: req.params.isbn,

            },

        },
        {

            new: true
        })



    return res.json({ books: updateBook, author: updateAuthor });


});




//______________________________________________________________Delete____________________________________



/*

Route                 author/delete
Description           delete a author
Access                public
Parameter             author
Methods               DELETE

*/


Router.delete("/delete/:authorId", async (req, res) => {


    const deleteAuthor = await AuthorModel.findOneAndDelete({ id: parseInt(req.params.authorId) },

    );



    const updateBookDatabase = await BookModel.findOneAndUpdate({ author: parseInt(req.params.authorId) },

        {

            $pull: {


                author: parseInt(req.params.authorId),


            },
        },
        {

            new: true,
        }

    );


    return res.json({ author: deleteAuthor, book: updateBookDatabase });


});


module.exports = Router;





