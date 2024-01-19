const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// config method-override
const methodOverride = require("method-override");

/*
    GET /comments - list all coments
    POST /comments - create a new comment
    GET /comments/:id - get comment by id
    PATCH/PUT /comments/:id - update one comment
    DELETE - /comments/:id - delete comment by id
*/

/*
    set up ketika ingin menggunakan methodOverride. timpa dengan header X-HTTP-Method-Override dalam permintaan

    dan pada argument "methodOverride" kita bisa mengisikan letak dimana kita akan menggantikan method "POST" ini dengan
    method yang kita inginkan, disini kita akan menggunakan paramater "method" didalam URL

    methodOverride("_method") memberi tahu middleware bahwa kita akan menggunakan parameter "_method" pada URL atau tubuh
    permintaan untuk menentukan metode HTTP yang sebenarnya. Anda dapat mengganti "_method" dengan nilai lain sesuai kebutuhan
    aplikasi Anda, tetapi "_method" cukup umum digunakan.

    <form method="POST" action="/resource/:id?_method=PUT">
    
    </form>

    _method adalah nama paramater pada URL yang berisikan value nama method yang kita inginkan
*/
app.use(methodOverride("_method")); // config middleware method-override

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

// halaman edit
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render("comments/edit", {
       comment 
    });
});

/*
    ada sedikit permasalahan ketika kita menggunakan method "PATCH", yaitu HTML Form tidak mensupport HTTP method/verb "PATCH"
    dan body type "form" itu mewakili form HTML

    cara menangani masalah form HTML tidak support HTTP Method "PATCH" kita bisa menggunakan package "method-override" ketika
    kita mengalami permasalah seperti ini dimana client tidak mensupport method "PATCH/PUT/DELETE"

    jadi mekanisme nya adalah karena html form hanya mensupport GET/POST, ketika request nya sudah masuk kedalam server atau
    backend (express) maka jenis method nya akan diubah atau ditimpa ketika terdapat paramater untuk melakukan override atau
    menggantikan method "POST" menjadi "PATCH/PUT/DELETE"

    package ini membantu agar express bisa mengerti suatu request ini menggunakan method "POST untuk PATCH" "POST untuk PUT"
    "POST untuk DELETE".  Paket ini memungkinkan kita untuk mensimulasikan metode HTTP yang berbeda dengan menggunakan metode
    POST dan menambahkan informasi metode yang diinginkan dalam request body atau melalui parameter URL.

    https://www.npmjs.com/package/method-override

    ketika kita melakukan request dari client menggunakan html form maka kita perlu menggunakan package "method-override"
    namun berbeda ketika kita melakukan request menggunakan teknologi "axios" atau menggunakan method PATCH, maka kita tidak
    perlu menggunakan "method-override"
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