const express = require("express");
const path= require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require('./util/db')
const router = require('./routes/router')

const app = express();
const port =process.env.PORT ||  3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use('/', router);

sequelize
    .sync()
    .then(result =>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
})
    .catch(err=>console.log(err))
