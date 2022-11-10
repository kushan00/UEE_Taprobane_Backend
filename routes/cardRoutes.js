const express = require("express");
const router = express.Router();

const {getCard, getCards, createCard,updateCard,deleteCardDetails} = require("../Controllers/CardController");


router.post("/createCard",createCard);
router.get("/getCards",getCards);
router.get("/getCardById/:id",getCard);
router.put("/updateCard/:id",updateCard);
router.delete("/deleteCardDetails/:id",deleteCardDetails);



module.exports = router;
