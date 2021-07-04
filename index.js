require("dotenv").config();

//___________________________Frame work______________________________________________
const express = require("express");

const mongoose = require("mongoose");


//___________________________Initializing express______________________________________

const booky = express();

//____________________________Configuration____________________________________________

booky.use(express.json());


//____________________________Microservices__________________________________________


const Books = require("./API/Book");

const Authors = require("./API/Author");

const Publications = require("./API/Publication");


//_________________________________Configure mongoose_____________________________________

mongoose
    .connect(process.env.MONGO_URL,
        {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        })

    .then(() => console.log("connection established!!!!!!!"));


//____________________________________Initializing microservices____________________________

booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);


booky.listen(5050, () => console.log("hey server is running "));