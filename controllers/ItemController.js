const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const ItemModel = require("../models/ItemsModel");

const getItems = async (req, res) => {
  try {
    const Items = await ItemModel.find()
    .populate({
        path: 'owner',
    });
    apiResponse.Success(res, "Items", { Items: Items });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};

const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const Item = await ItemModel.find({ _id: id })
    .populate({
      path: 'owner',
    });
    apiResponse.Success(res, "Item", { Item: Item });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};

const createItem = async (req, res) => {
    const Item = req.body;

    const newItem = new ItemModel({ ...Item });

    //generate Item id
    const item_Id = await uniqueID.generateItemID();
    newItem.item_id = item_Id;

    console.log("Saved Item data", newItem);
    try {
        await newItem.save();

        apiResponse.Success(res, "NewItem", { newItem: newItem });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}


const updateItem = async (req, res) => {
    const { id } = req.params;
    const { item_Id, name, description, is_wholesale, unit_price, image_url } = req.body;

    const filter = { _id: id };
    const update = {
        item_Id: item_Id,
        name: name,
        description: description,
        is_wholesale: is_wholesale,
        unit_price: unit_price,
        image_url: image_url,
    };

    try {

        let data = await ItemModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res, "Item Details Updated", { data: data });

    } catch (error) {
        apiResponse.ServerError(res, "Server Error", { err: error });
    }
}


const deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Item with id: ${id}`);

    await ItemModel.findByIdAndRemove(id);

    apiResponse.Success(res, "Item Deleted", {});
}

module.exports = { getItems, getItem, deleteItem, createItem, updateItem };