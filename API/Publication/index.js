const Router = require("express").Router();


const PublicationModel = require("../../publication");

const BookModel = require("../../book");



//_______________________________________________________API'S______________________________________________



/*

Route                 /publication
Description           to get all publication
Access                public
Parameter             NONE
Methods               GET

*/

Router.get("/", async (req, res) => {


    const getPublication = await PublicationModel.find();



    if (!getPublication) {

        res.json({ error: `publication no found ${req.params.publication}` })


    } else {


        res.json({ publication: getPublication });

    }


});




//----------------------------------------------Push the publication---------------------------------

/*

Route                 /publication/add
Description           add new Publication
Access                public
Parameter             none
Methods               POST

*/

Router.post("/new", async (req, res) => {

    try {

        const { newPublication } = req.body;

        await PublicationModel.create(newPublication);

        return res.json({ message: "publication added" });



    } catch (error) {

        return res.json({ error: error.message});
    }
});
/*---------------------------------------------------------put-------------------------------------------------*/




//--------------------update/add new book to a publicaion

/*

Route                 /publication/update/book
Description           update add mew book to a publication
Access                public
Parameter             isbn
Methods               PUT

*/


Router.put("/update/book/:id", async (req, res) => {

    const updateBookToPub = await PublicationModel.findOneAndUpdate({ id: parseInt(req.params.id) },
        {

            $addToSet: {

                books: req.body.newBook,

            },
        },
        {


            new: true,

        },

    );


    const updateBookdatabase = await BookModel.findOne({ ISBN: req.body.newBook },

        {


            $pull: {

                publication: parseInt(req.params.id),

            },

        },
        {
            new: true,
        }

    );

    return res.json({ publication: updateBookToPub, books: updateBookDatabase });


});



module.exports = Router;