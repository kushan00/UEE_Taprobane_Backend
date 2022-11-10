const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

const cardModel = require("../models/cardModel");



 const getCards = async (req, res) => { 
    try {
        const cards = await cardModel.find();
                 
        apiResponse.Success(res,"cards",{ cards: cards })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const getCard = async (req, res) => { 
    const { id } = req.params;

    try {
        const card = await cardModel.findOne({card_Owner:mongoose.Types.ObjectId(id)});
        
        apiResponse.Success(res,"card",{ card: card })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createCard = async (req, res) => {
    const card = req.body;

    const newCard = new cardModel({ ...card, creator: req.cardId, })
    console.log("Saved data",newCard);
    try {
        await newCard.save();
        
        apiResponse.Success(res,"Newcard",{ newCard: newCard })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}

const updateCard = async (req, res) => {
    const { id } = req.params;
    const { ctype, holder, cardNum, year, month, cvv , card_Owner } = req.body;
    console.log(id,ctype,holder,cardNum,year,month,cvv,card_Owner);
    const filter = { card_Owner: id };
    const update = {
        ctype: ctype,
        holder: holder,
        cardNum: cardNum,
        year: year,
        month: month,
        cvv:cvv,
        card_Owner: card_Owner,
    };

    try {

        let data = await cardModel.findOneAndUpdate(filter, update);
        console.log(data);
        apiResponse.Success(res, "Card Details Updated", { data: data });

    } catch (error) {
        apiResponse.ServerError(res, "Server Error", { err: error });
    }
}

const deleteCardDetails = async (req, res) => {
    const { id } = req.params;

    await cardModel.findOneAndRemove({card_Owner:mongoose.Types.ObjectId(id)});

    apiResponse.Success(res, "Delivery Details Deleted", {});
}


module.exports = {getCard, getCards,createCard,updateCard,deleteCardDetails};