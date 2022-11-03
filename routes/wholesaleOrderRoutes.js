const express = require("express");
const router = express.Router();

const { getWholesaleOrders , getWholesaleOrder, deleteWholesaleOrder, createWholesaleOrder, updateWholesaleOrder} = require("../Controllers/WholesaleOrderController");

router.post("/createWholesaleOrder",createWholesaleOrder);
router.get("/getAllWholesaleOrders",getWholesaleOrders);
router.get("/getWholesaleOrder/:id",getWholesaleOrder);
router.delete("/deleteWholesaleOrder/:id",deleteWholesaleOrder);
router.put("/updateWholesaleOrder/:id",updateWholesaleOrder);

module.exports = router;
