const express = require("express");
const router = express.Router();

const { getItems , getItem, deleteItem, createItem, updateItem} = require("../Controllers/ItemController");

router.post("/createItem",createItem); //create item route
router.get("/getAllItems",getItems); //get all items route
router.get("/getItem/:id",getItem); //get item by id route
router.delete("/deleteItem/:id",deleteItem); //delete item by id route
router.put("/updateItem/:id",updateItem); //update item by id route

module.exports = router;
