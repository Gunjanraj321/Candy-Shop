const sequelize = require("../util/db");
const Item = require("../models/item");

const getData = (req, res) => {
  Item.findAll()
    .then((data) => {
      //Handle successful read data
      res.status(201).json(data);
    })
    .catch((error) => {
      //hanlde error
      console.error("error occured while reading item", error);
      res.status(500).json({ message: "internal server error" });
    });
};

const createData = (req, res) => {
  const { itemName, description, price } = req.body;
  Item.create({
    itemName: itemName,
    description: description,
    price: price,
  })
    .then((data) => {
      //Handle successful creation
      console.log("Item created :", data.toJSON());
      res.status(201).json({ message: "item created successfully" });
    })
    .catch((error) => {
      //hanlde error
      console.error("error occured while creating item", error);
      res.status(500).json({ message: "internal server error" });
    });
};

const updateData = async (req, res) => {
  const itemId = req.params.id;
  let newQuantity = req.body.quantity;

  try {
    const item = await Item.findOne({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({ Error: "Item not found" });
    }

    const currentQuantity = item.quantity;
    const updatedQuantity = currentQuantity + newQuantity;

    if (updatedQuantity < 0) {
      return res.status(400).json({ error: "invalid quantity" });
    }
    if (updatedQuantity === 0) {
      await Item.destroy({
        where: { id: itemId },
      });
      return res.json({ message: "item deleted succesfully" });
    }
    item.quantity = updatedQuantity;
    await item.save();
    res.json({ message: "item updated succesfully" });
  } catch (error) {
    console.log("error while deleting/updating item ", error);
    res.status(500).json({ error: "Intenral server Error" });
  }
};

module.exports = { getData, createData, updateData };
