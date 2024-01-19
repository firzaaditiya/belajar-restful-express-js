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

    // field/property akan mengikuti nama variable
    comments.push({
        id: uuidv4(),
        username,
        text
    });

    res.redirect("/comments");
});

/*
    terdapat masalah mengenai nilai "id" yang kita miliki dimana nilai "id" kita dalah "1,2,3,4,5" dan ini mudah ditebak
    dan kurang bagus untuk diterapkan, seperti misal pada database maka lebih baik kita menggunakan UUID, karena jika 
    kita menggunakan id seperti "1,2,3,4" ini tidak aman dan biasanya itu mudah ditebak dan bisa jadi itu menjadi celah
    aplikasi kita atau sistem kita bisa ditembus alternatif nya kita bisa menyembunyikan nilai "id" ini, jadi yang kita
    tampilkan didalam request itu bukan id dari identitas yang ada didalam database tapi kita bisa menggunakan alias
    "id" atau kita bisa menggunakan "UUID" atau "Universal Unique identifier" dan bentuk dari UUID itu string panjang
    yang sulit ditebak dan dari pada kita menggunakan integer id nya dengan batas nilai nya yang terbatas jdi lebih baik
    kita menggunakan UUID

    contoh : 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
*/

// GET /comments/:id - get comment by id
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/show", {
       comment 
    });
});

app.listen(8080, () => {
    console.info("Server running on http://localhost:8080");
});