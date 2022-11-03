const express = require("express");
const router = express.Router();

const { getItemPackages , getItemPackage, deleteItemPackage, createItemPackage, updateItemPackage} = require("../Controllers/ItemPackageController");

router.post("/createItemPackage",createItemPackage);
router.get("/getAllItemsPackage",getItemPackages);
router.get("/getItemPackage/:id",getItemPackage);
router.delete("/deleteItemPackage/:id",deleteItemPackage);
router.put("/updateItemPackage/:id",updateItemPackage);

module.exports = router;