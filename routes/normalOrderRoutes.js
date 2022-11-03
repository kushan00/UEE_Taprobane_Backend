const express = require("express");
const router = express.Router();

const { getNormalOrders , getNormalOrder, deleteNormalOrder, createNormalOrder, updateNormalOrder} = require("../Controllers/normalOrderController");

router.post("/createNormalOrder",createNormalOrder);
router.get("/getAllNormalOrders",getNormalOrders);
router.get("/getNormalOrder/:id",getNormalOrder);
router.delete("/deleteNormalOrder/:id",deleteNormalOrder);
router.put("/updateNormalOrder/:id",updateNormalOrder);

module.exports = router;
