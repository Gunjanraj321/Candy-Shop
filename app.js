const express = require("express");
const app=express();

express.json();

const port=3000;

app.use("/",(req, res)=>{
    res.json({message:"gunjan kumar"})
})

app.listen(port,()=>{
    console.log("server running")
});