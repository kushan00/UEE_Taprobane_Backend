const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const normalOrderModel = require("../models/normalOrderModel");

//-----get normal orders--------//
const getNormalOrders = async (req, res) => {
  try {
    const normalOrders = await normalOrderModel.find()
    .populate({
      path: "foriegn_user_Id",
  })
  .populate({
    path: "delivery_rider_id",
});
    apiResponse.Success(res, "normalOrders", { normalOrders: normalOrders });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};


//-----get normal order by id--------//
const getNormalOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const normalOrder = await normalOrderModel.find({ _id: id })
    .populate({
      path: "foriegn_user_Id"
    })
    .populate({
      path: "delivery_rider_id",
  });

    apiResponse.Success(res, "normalOrder", { normalOrder: normalOrder });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res, "Server Error", { err: err });
  }
};

//-----create new normal order--------//

const createNormalOrder = async (req, res) => {

    const normalOrder = req.body;

    const newNormalOrder = new normalOrderModel({ ...normalOrder });

    //generate normalOrder id
    const normalOrder_Id = await uniqueID.generateNormalOrderID();
    newNormalOrder.normalOrder_Id = normalOrder_Id;

    console.log("Saved Normal Order data", newNormalOrder);
    try {
        await newNormalOrder.save();

        apiResponse.Success(res, "newNormalOrder", { newNormalOrder: newNormalOrder });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

//-----update normal order--------//

const updateNormalOrder = async (req, res) => {
    const { id } = req.params;
    const { normalOrder_Id, foriegn_user_Id,products,payment_method,delivery_method,final_price,confirm_status,delivery_rider_id} = req.body;

    const filter = { _id: id };
    const update = {
        normalOrder_Id: normalOrder_Id,
        foriegn_user_Id: foriegn_user_Id,
        products: products,
        payment_method: payment_method,
        delivery_method: delivery_method,
        final_price: final_price,
        confirm_status:confirm_status,
        delivery_rider_id:delivery_rider_id
    };

    try {

        let data = await normalOrderModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res, "normal Order Details Updated", { data: data });

    } catch (error) {
        apiResponse.ServerError(res, "Server Error", { err: error });
    }
}


//-----delete normal order--------//

const deleteNormalOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No normal Order with id: ${id}`);

    await normalOrderModel.findByIdAndRemove(id);

    apiResponse.Success(res, "normal Order Deleted", {});
}

module.exports = { getNormalOrders, getNormalOrder, deleteNormalOrder, createNormalOrder, updateNormalOrder };