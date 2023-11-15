const connection = require("../database/db")

const getData = (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
        if (err) {
            console.log("error fetching data", err);
            res.status(500).json({ message: "error while fetching data" });
        } else {
            res.json(results);
        }
    });
}

const createData = (req, res) => {
    const { itemName, description, price } = req.body; 
    connection.query('INSERT INTO items (itemName, description, price) VALUES (?, ?, ?)',
        [itemName, description, price],
        (err, results) => {
            if (err) {
                console.error('Error adding item:', err); 
               res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Item added successfully' });
            }
        });
}

const updateData =(req, res) => {
    const itemId = req.params.id;
    let newQuantity = req.body.quantity;
    let quant;

        connection.query("select quantity from items where id = ?",[itemId],(err,result)=>{
        result.forEach(data =>{
            quant=data.quantity;
        })
        if(newQuantity>0 && quant >= 0 ){
            quant+=newQuantity;
        }
        else if(newQuantity<0 && quant>0){
            quant+=newQuantity;  
        }
        else if(quant === 0 && newQuantity < 0){
            connection.query('delete from items where id= ?',[itemId],(err,result)=>{
                if (err) {
                    console.error('Error deleting item:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.json({ message: 'Item deleted successfully' });
                }
            });
            return;
        }
        connection.query("UPDATE items SET quantity = ? WHERE id = ?",
        [quant, itemId],
        (err, results) => {
            if (err) {
                console.error('Error updating item quantity:', err); 
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Item quantity updated successfully' });
            }
        });  
    }); 
}

module.exports = { getData , createData , updateData } ;