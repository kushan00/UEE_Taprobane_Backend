const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const wholesaleOrderModel = require("../models/wholesaleOrderModel");

//-----get Wholesale orders--------//
const getWholesaleOrders = async (req, res) => {
  try {
    const wholesaleOrders = await wholesaleOrderModel.find()
    .populate({
      path: "wholesalebuyer_Id",
  })
  .populate({
    path: "delivery_rider_id",
});
    apiResponse.Success(res, "wholesaleOrders", { wholesaleOrders: wholesaleOrders });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};


//-----get Wholesale order by id--------//
const getWholesaleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const wholesaleOrder = await wholesaleOrderModel.find({ _id: id })
    .populate({
      path: "wholesalebuyer_Id",
  })
  .populate({
    path: "delivery_rider_id",
});
    apiResponse.Success(res, "WholesaleOrder", { wholesaleOrder: wholesaleOrder });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};

//-----create new Wholesale order--------//

const createWholesaleOrder = async (req, res) => {

    const wholesaleOrder = req.body;

    const newWholesaleOrder = new wholesaleOrderModel({ ...wholesaleOrder });

    //generate WholesaleOrder id
    const wholesaleOrder_Id = await uniqueID.generateWholesaleOrderID();
    newWholesaleOrder.WholesaleOrder_Id = wholesaleOrder_Id;

    console.log("Saved Wholesale Order data", newWholesaleOrder);
    try {
        await newWholesaleOrder.save();

        apiResponse.Success(res, "newWholesaleOrder", { newWholesaleOrder: newWholesaleOrder });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

//-----update Wholesale order--------//

const updateWholesaleOrder = async (req, res) => {
    const { id } = req.params;
    const { wholesaleOrder_Id, wholesalebuyer_Id,products,payment_method,delivery_method,final_price,confirm_status,delivery_rider_id} = req.body;

    const filter = { _id: id };
    const update = {
        wholesaleOrder_Id: wholesaleOrder_Id,
        wholesalebuyer_Id: wholesalebuyer_Id,
        products: products,
        payment_method: payment_method,
        delivery_method: delivery_method,
        final_price: final_price,
        confirm_status:confirm_status,
        delivery_rider_id:delivery_rider_id
    };

    try {

        let data = await wholesaleOrderModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res, "Wholesale Order Details Updated", { data: data });

    } catch (error) {
        apiResponse.ServerError(res, "Server Error", { err: error });
    }
}


//-----delete Wholesale order--------//

const deleteWholesaleOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Wholesale Order with id: ${id}`);

    await wholesaleOrderModel.findByIdAndRemove(id);

    apiResponse.Success(res, "Wholesale Order Deleted", {});
}

module.exports = { getWholesaleOrders, getWholesaleOrder, deleteWholesaleOrder, createWholesaleOrder, updateWholesaleOrder };