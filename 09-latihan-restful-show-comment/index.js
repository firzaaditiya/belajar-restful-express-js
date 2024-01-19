const express = require("express");
const app = express();
const path = require("path");

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
        id: 1,
        username: "Andy",
        text: "Perfect World keren banget animasi nya !"
    },
    {
        id: 2,
        username: "Luo Yi",
        text: "Yun Xi best character ever, Cakep parah !"
    },
    {
        id: 3,
        username: "Septian",
        text: "Ingfo spoiler BTTH sampe tamat puh !"
    },
    {
        id: 4,
        username: "WuQi",
        text: "Ranah paling akhir renegade immortal apa ya puh !"
    },
    {
        id: 5,
        username: "Zeri",
        text: "Baca novel yang bahasa indo dimana ya yang bagus?"
    },
    {
        id: 6,
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
        id: comments.length + 1,
        username,
        text
    });

    res.redirect("/comments");
});

// GET /comments/:id - get comment by id
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === parseInt(id));

    res.render("comments/show", {
       comment 
    });
});

app.listen(8080, () => {
    console.info("Server running on http://localhost:8080");
});