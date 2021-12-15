const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let Books = [{
        id: 0,
        PIB: "Churko Anita Vjacheslavivna",
        position: "designer",
        change: 1200,
        manyChildren: 1,
        experience: 5
    },
    {
        id: 1,
        PIB: "Gusieva Julia Vasilivna",
        position: "politolog",
        change: 500,
        manyChildren: 3,
        experience: 3,
    },
    {
        id: 2,
        PIB: "Nickulich Daniel Zoltanovich",
        position: "chief cook",
        change: 5500,
        manyChildren: 3,
        experience: 8,
    },
];

//CRUD
app.get("/books", (req, res) => {
    res.send(Books);
});

app.get("/books/query", (req, res) => {
    let queriedBooks = Books;
    if (req.query.minprice)
        queriedBooks = queriedBooks.filter(
            (book) => book.price >= parseFloat(req.query.minprice)
        );
    if (req.query.author)
        queriedBooks = queriedBooks.filter((book) =>
            book.authors.includes(req.query.author)
        );
    res.send(queriedBooks);
});

app.get("/books/:id", (req, res) => {
    let book = Books.find((book) => book.id === parseInt(req.params.id));
    if (book !== null) res.status(200).send(book);
    else res.status(404).send("Not Found");
});

app.delete("/books/:id", (req, res) => {
    let index = Books.findIndex((book) => book.id === parseInt(req.params.id));
    if (index >= 0) {
        let deletedBook = Books[index];
        Books.splice(index, 1);
        res.send(deletedBook);
    } else res.status(404).send("Not Found");
});

app.post("/books", (req, res) => {
    let newBook = {
        id: Number(Date.now()),
        ...req.body,
    };
    Books.push(newBook);
    res.send(newBook);
});

app.patch("/books/:id", (req, res) => {
    let index = Books.findIndex((book) => book.id === parseInt(req.params.id));
    if (index >= 0) {
        let updatedBook = Books[index];
        for (let key in updatedBook)
            if (req.body[key]) updatedBook[key] = req.body[key];
        res.send(updatedBook);
    } else res.status(404).send("Not Found");
});

app.all("/", (req, res) => {
    res.send("Test");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});