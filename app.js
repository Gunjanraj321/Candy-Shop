const express = require("express");
const dataController = require("./controllers/dataController")
const connection = require('./database/db');
const bodyParser = require("body-parser");
const path= require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port =process.env.PORT ||  3000;

app.use(cors());
app.use(bodyParser.json());

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to database");
    }
});

app.use(express.static(path.join(__dirname,"public")));

app.get('/data', dataController.getData);

app.post("/data", dataController.createData);

app.put("/data/:id", dataController.updateData);

app.listen(port, () => {
    console.log("server running");
});
