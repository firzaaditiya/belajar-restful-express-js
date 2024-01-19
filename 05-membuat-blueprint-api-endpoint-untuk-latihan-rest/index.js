const express = require("express");
const app = express();

app.use(express.urlencoded({
    extended: true
}));

/*
    blueprint endpoint dan rest

    GET /comments - list all coments
    POST /comments - create a new comment
    GET /comments/:id - get comment by id
    PATCH/PUT /comments/:id - update one comment
    DELETE - /comments/:id - delete comment by id
*/

app.listen(8080, () => {
    console.info(`Server running on http://localhost:8080`);
});