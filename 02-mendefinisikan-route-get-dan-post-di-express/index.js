const express = require("express");
const app = express();

// mendefinisikan method get, agar ketika client mengirim request dengan method get bisa mendapatkan response
app.get("/order", (req, res) => {
    res.send("GET order response");
});

// mendefinisikan method post
app.post("/order", (req, res) => {
    res.send("POST order response");
});

app.listen(8080, () => {
    console.info("Server running at http://localhost:8080");
});