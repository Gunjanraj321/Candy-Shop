const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const path= require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "products",
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to database");
    }
});

app.use(express.static(path.join(__dirname,"public")));

// app.get("/data/:id", (req, res) => {

//     const itemId = req.params.id;
//     //const quantity = req.body.quantity;
//     console.log(itemId);
//     connection.query("select * from items where id = ?",
//     [itemId],(err, result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result[0]);
//             res.json(result[0]);
//         }
//     }
//     )
// })

app.get('/data', (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
        if (err) {
            console.log("error fetching data", err);
            res.status(500).json({ message: "error while fetching data" });
        } else {
            res.json(results);
        }
    });
});

app.post("/data", (req, res) => {
    const { itemName, description, price, quantity } = req.body; // Fixed typo

    connection.query('INSERT INTO items (itemName, description, price) VALUES (?, ?, ?)',
        [itemName, description, price],
        (err, results) => {
            if (err) {
                console.error('Error adding item:', err); // Fixed variable name
               res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Item added successfully' });
            }
        });
});

app.put("/data/:id", (req, res) => {
    const itemId = req.params.id;
    const newQuantity = req.body.quantity;

    connection.query("UPDATE items SET quantity = ? WHERE id = ?",
        [newQuantity, itemId],
        (err, results) => {
            if (err) {
                console.error('Error updating item quantity:', err); // Fixed variable name
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Item quantity updated successfully' });
            }
        });
});



app.listen(port, () => {
    console.log("server running");
});
