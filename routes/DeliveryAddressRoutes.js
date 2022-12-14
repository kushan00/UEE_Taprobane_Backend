const express = require("express");
const router = express.Router();

const {getDeliveryAddress, getDeliveryAddresss,createDeliveryAddress,updateDeliveryAddress,deleteDeliveryDetails} = require("../Controllers/DeliveryAddressController");


router.post("/createDeliveryAddress",createDeliveryAddress);
router.get("/getDeliveryAddresss",getDeliveryAddresss);
router.get("/getDeliveryAddressById/:id",getDeliveryAddress);
router.put("/updateDeliveryAddress/:id",updateDeliveryAddress);
router.delete("/deleteDeliveryDetails/:id",deleteDeliveryDetails);



module.exports = router;
