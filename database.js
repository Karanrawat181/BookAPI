
const books = [
    {

        ISBN: "12345One",
        title : "Getting stated with java",
        pubDate: "2021-07-07", 
        language : "en",
        numPage : 250,
        author : [1,2],
        category:["fiction" , "programing" ,"tech" ,"triller"],
        publication:1,
        
    
    },{

    ISBN: "12345Book",
    title : "Getting stated with MERN",
    pubDate: "2021-07-07", 
    language : "en",
    numPage : 250,
    author : [1,2],
    category:["tech" , "programing" ,"education" ,"triller"],
    publication:1,
    

},

];



const author = [{

    id : 1,
    name :"pavan",
    books : ["12345Book" ],
    
},

{
id : 2,
name: "elon mask",
books : ["book818"],

},

];




const publication = [{
 
    id:1, 

    name: "writex",

    books : ["12345Book"],

 }, 

 {

   
    id:2, 

    name: "koreabio",

    books : [],

 }
];


module.exports = { books, author ,publication };



