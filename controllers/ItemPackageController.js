const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const ItemPackageModel = require("../models/ItemPackageModel");

const getItemPackages = async (req, res) => {
  try {
    const ItemPackages = await ItemPackageModel.find()
    .populate({
        path: "Item_id",
    });

    apiResponse.Success(res, "ItemPackages", { ItemPackages: ItemPackages });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};

const getItemPackage = async (req, res) => {
  const { id } = req.params;
  try {
    const ItemPackage = await ItemPackageModel.find({ _id: id })
    .populate({
        path: "Item_id",
    });

    apiResponse.Success(res, "ItemPackage", { ItemPackage: ItemPackage });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};

const createItemPackage = async (req, res) => {
    const Item = req.body;

    const ItemPackage = new ItemPackageModel({ ...Item });

    //generate Item id
    const Item_Id = await uniqueID.generateItemPackageID();
    ItemPackage.Item_Id = Item_Id;

    console.log("Saved Item data", ItemPackage);
    try {
        await ItemPackage.save();

        apiResponse.Success(res, "ItemPackage", { ItemPackage: ItemPackage });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}


const updateItemPackage = async (req, res) => {
    const { id } = req.params;
    const { package_id, Item_id, name, no_units, package_price } = req.body;

    const filter = { _id: id };
    const update = {
        package_id: package_id,
        Item_id: Item_id,
        name: name,
        no_units: no_units,
        package_price: package_price    
    };

    try {

        let data = await ItemPackageModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res, "Item Package Details Updated", { data: data });

    } catch (error) {
        apiResponse.ServerError(res, "Server Error", { err: error });
    }
}


const deleteItemPackage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Item package with id: ${id}`);

    await ItemPackageModel.findByIdAndRemove(id);

    apiResponse.Success(res, "Item Package Deleted", {});
}

module.exports = { getItemPackages , getItemPackage, deleteItemPackage, createItemPackage, updateItemPackage };