const books = [{

    ISBN: "1234Book",
    title : "Getting stated with MERN",
    pubDate: "2021-07-07", 
    language : "en",
    numPage : 250,
    author : [1,2],
    category:["tech" , "programing" ,"education" ,"triller"],

},
];




const author = [{

    id : 1,
    name :"pavan",
    books : ["12345Book"],
    
},

{
id : 2,
name: "elon mask",
books : ["12345Book , 98218098210"],

},

];


const publication = [{
 
    id:1, 
    name: "writex",

    books : ["12345Book"],

 }, 

];


module.exports = { books, author ,publication };



