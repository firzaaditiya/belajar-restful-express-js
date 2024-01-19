const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

/*
    GET /comments - list all coments
    POST /comments - create a new comment
    GET /comments/:id - get comment by id
    PATCH/PUT /comments/:id - update one comment
    DELETE - /comments/:id - delete comment by id
*/

// middleware "application/x-www-form-urlencoded"
app.use(express.urlencoded({
    extended: true
}));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const comments = [
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

/*
    ketika kita melakukan sebuah update data kita perlu menggunakan HTTP verb/method yaitu "PUT/PATCH", terkadang masih
    banyak yang bingung akan memakai yang mana. Perbedaan "PUT/PATCH" adalah jika method "PUT" itu seolah olah kita akan
    mengubah seluruh resource dari data yang kita miliki dari suatu target data

    misalkan kita memiliki sebuah tabel data dan memiliki banyak kolom, dan kita akan mengubah semua data yang ada dikolom
    kolom tersebut maka lebih baik kita menggunakan "PUT", sementara ketika kita hanya ingin mengubah beberapa data saja
    akan lebih baik kita menggunakan "PATCH"
*/
// PATCH /comments/:id - update one comment
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.text;

    const foundComment = comments.find(c => c.id === id);
    foundComment.text = newComment;

    console.info(newComment);
    console.info(foundComment);

    res.redirect("/comments");
});

app.listen(8080, () => {
    console.info("Server running on http://localhost:8080");
});