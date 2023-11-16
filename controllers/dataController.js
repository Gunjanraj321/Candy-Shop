const sequelize = require("../util/db");
const Item = require('../models/item')

const getData = (req, res) => {
  Item.findAll()
    .then((data)=>{
      //Handle successful read data
    res.status(201).json(data);
    }).catch((error)=>{
      //hanlde error
      console.error("error occured while reading item", error);
      res.status(500).json({message:'internal server error'});
    })
};

const createData = (req, res) => {
  const { itemName, description, price , quantity } = req.body;
  Item.create({
    itemName:itemName,
    description:description,
    price:price,
    quantity:quantity
  }).then((data)=> {
    //Handle successful creation
    console.log('Item created :',data.toJSON());
    res.status(201).json({message:"item created successfully"});
  })
    .catch((error)=>{
      //hanlde error
      console.error("error occured while creating item", error);
      res.status(500).json({message:'internal server error'});
    })
};

const updateData = (req, res) => {
  const itemId = req.params.id;
  let newQuantity = req.body.quantity;

  connection.query(
    "select quantity from items where id = ?",
    [itemId],
    (err, result) => {
      if(err){
        console.error("error while querying")
        return res.status(500).json({Error:"Internalm server Error"})
      }
      if(result.length === 0){
        return res.status(404).json({error:"Item not found"})
      }

      const currentQuantity = result[0].quantity;
      const updatedQuantity = currentQuantity + newQuantity;

      if(updatedQuantity < 0){
        return res.status(400).json({error:"invalid quantity"})
      }

      const query = updatedQuantity === 0 
        ? "Delete from items where id =?"
        : "update items set quantity = ? where id = ? ";

      const params = updatedQuantity === 0 ? [itemId] : [updatedQuantity , itemId];

      connection.query(query , params , (err,result) => {
        if(err){
          console.error("error updating/deleting data");
          res.status(500).json({error:"internal server error"})
        }else{
          const message = updatedQuantity === 0
            ? "Item deleted succesfully" 
            : "item updated succesfully";
          res.json({ message })
        }
      });
    }
  );
};

module.exports = { getData,createData,updateData };