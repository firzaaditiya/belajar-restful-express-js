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

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const comments = [
    {
        username: "Andy",
        text: "Perfect World keren banget animasi nya !"
    },
    {
        username: "Luo Yi",
        text: "Yun Xi best character ever, Cakep parah !"
    },
    {
        username: "Septian",
        text: "Ingfo spoiler BTTH sampe tamat puh !"
    },
    {
        username: "WuQi",
        text: "Ranah paling akhir renegade immortal apa ya puh !"
    },
    {
        username: "Zeri",
        text: "Baca novel yang bahasa indo dimana ya yang bagus?"
    },
    {
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

app.listen(8080, () => {
    console.info("Server running on http://localhost:8080");
});