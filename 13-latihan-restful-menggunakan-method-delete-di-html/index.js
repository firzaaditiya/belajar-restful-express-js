const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

/*
    GET /comments - list all coments
    POST /comments - create a new comment
    GET /comments/:id - get comment by id
    PATCH/PUT /comments/:id - update one comment
    DELETE - /comments/:id - delete comment by id
*/

// config/setup middleware method-override
app.use(methodOverride("_method"));

// middleware "application/x-www-form-urlencoded"
app.use(express.urlencoded({
    extended: true
}));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// ubah menjadi "let" karena akan melakukan reasign value
let comments = [
    {
        id: uuidv4(),
        username: "Andy",
        text: "Perfect World keren banget animasi nya !"
    },
    {
        id: uuidv4(),
        username: "Luo Yi",
        text: "Yun Xi best character ever, Cakep parah !"
    },
    {
        id: uuidv4(),
        username: "Septian",
        text: "Ingfo spoiler BTTH sampe tamat puh !"
    },
    {
        id: uuidv4(),
        username: "WuQi",
        text: "Ranah paling akhir renegade immortal apa ya puh !"
    },
    {
        id: uuidv4(),
        username: "Zeri",
        text: "Baca novel yang bahasa indo dimana ya yang bagus?"
    },
    {
        id: uuidv4(),
        username: "Pino",
        text: "Ini text comment"
    },
];

// GET /comments - list all coments
app.get("/comments", (req, res) => {
    // mengirim seluruh data comments
    res.render("comments/index", {
        comments
    });
});

app.get("/comments/create", (req, res) => {
    res.render("comments/create");
});

// POST /comments - create a new comment
app.post("/comments", (req, res) => {
    const { username, text } = req.body;

    comments.push({
        id: uuidv4(),
        username,
        text
    });

    res.redirect("/comments");
});

// GET /comments/:id - get comment by id
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/show", {
       comment 
    });
});

// halaman edit
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/edit", {
       comment 
    });
});

// PATCH /comments/:id - update one comment
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.text;

    const foundComment = comments.find(c => c.id === id);
    foundComment.text = newComment;

    res.redirect("/comments");
});

// DELETE - /comments/:id - delete comment by id
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;

    /*
        untuk mencari data yang ada didalam object atau bukan berdasarkan index nya atau berdasarkan dari suatu value yang
        ada didalam array kita bisa menggunakan array method "filter()"

        jadi mekanisme nya ketika "comment.id" tidak sama dengan "id" yang dikirimkan dari request "id comment yang ingin
        dihapus" maka akan disimpan kembali ke variable "comments" dan id yang sama tidak akan disimpan ke dalam variable
        "comments"
    */
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
});

app.listen(8080, () => {
    console.info("Server running on http://localhost:8080");
});