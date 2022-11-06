const express = require("express");
const router = express.Router();

const {getCard, getCards, createCard,updateCard} = require("../Controllers/CardController");


router.post("/createCard",createCard);
router.get("/getCards",getCards);
router.get("/getCardById/:id",getCard);
router.put("/updateCard/:id",updateCard);



module.exports = router;
