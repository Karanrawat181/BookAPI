const mongoose = require("mongoose");


const PublicationSchema = mongoose.Schema({



    id : Number,
    name :{
        type : String,
        required : true,
    },
    books : [String]
    

});

const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports= PublicationModel;