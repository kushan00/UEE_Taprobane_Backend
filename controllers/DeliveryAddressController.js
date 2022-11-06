const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

const DeliveryAddressModel = require("../models/deliveryAddressModel");

 const getDeliveryAddresss = async (req, res) => { 
    try {
        const DeliveryAddress = await DeliveryAddressModel.find();
                 
        apiResponse.Success(res,"DeliveryAddress",{ DeliveryAddress: DeliveryAddress })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const getDeliveryAddress = async (req, res) => { 
    const { id } = req.params;

    try {
        const DeliveryAddress = await DeliveryAddressModel.findOne({address_owner:mongoose.Types.ObjectId(id)});
        
        apiResponse.Success(res,"DeliveryAddress",{ DeliveryAddress: DeliveryAddress })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createDeliveryAddress = async (req, res) => {
    const DeliveryAddress = req.body;

    const newDeliveryAddress = new DeliveryAddressModel({ ...DeliveryAddress, creator: req.cardId, })
    console.log("Saved data",newDeliveryAddress);
    try {
        await newDeliveryAddress.save();
        
        apiResponse.Success(res,"NewDeliveryAddress",{ newDeliveryAddress: newDeliveryAddress })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}

const updateDeliveryAddress = async (req, res) => {
    const { id } = req.params;
    const { address_owner, addressLine1, addressLine2, mobileno} = req.body;

    const filter = { address_owner: id };
    const update = {
        address_owner: address_owner,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        mobileno: mobileno,
    };

    try {

        let data = await DeliveryAddressModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res, "DeliveryAddress Details Updated", { data: data });

    } catch (error) {
        apiResponse.ServerError(res, "Server Error", { err: error });
    }
}


module.exports = {getDeliveryAddress, getDeliveryAddresss,createDeliveryAddress,updateDeliveryAddress};