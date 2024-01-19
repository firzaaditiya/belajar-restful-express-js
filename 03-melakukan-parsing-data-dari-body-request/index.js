const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

/*
    properti "extended" bernilai "true" agar kita bisa mengambil data dari enctype "form : multipart/form-data" atau
    "form-encode : application/x-www-form-urlencoded"
*/
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// disini kita bisa langsung menggunakan method "urlencoded" dari "express" karena secara default express sudah memiliki nya
app.use(express.urlencoded({
    extended: true
}));

// bisa menerima data berupa type JSON, jika middleware ini tidak aktif maka "req.body" akan berisi object kosong
app.use(express.json());

app.get("/order", (req, res) => {
    res.send("GET order response");
});

app.post("/order", (req, res) => {
    /*
        ketika kita mengirimkan data menggunakan mehtod post dan yang kita tahu ketika kita mengirimkan data menggunakan
        method get maka kita bisa mendapatkan data itu melalui "req.params", dan disini kita mencoba untuk mendapatkan
        data dari method post yang dikirimkan namun hasil nya dalah undefined. karena memang secara default adalah
        undefined

        https://expressjs.com/en/5x/api.html#req.body

        cara agar kita bisa mendapatkan data dari body kita perlu menggunakan middleware yaitu :

        const bodyParser = require('body-parser')
        app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

        "application/x-www-form-urlencoded" : adalah enctype yang tidak support multipart atau tidak support file, dan data
        tidak berupa file

        sedangkan "multipart/form-data" ini mendukung pengiriman data yang tipe nya adalah file

        ketika kita telah menerapkan middleware maka "req.body" tidak akan "undefined" melainkan akan memiliki data yang
        seharus nya yaitu data yang dikirimkan dari client
    */
    console.info(req.body); // undefined

    // destructuring
    const { item, quantity } = req.body;

    res.send(`Item: ${item}, Quantity: ${quantity}`);
});

app.listen(8080, () => {
    console.info("Server running at http://localhost:8080");
});