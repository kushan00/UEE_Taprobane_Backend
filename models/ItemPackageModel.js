const mongoose = require("mongoose");

const ItemPackageSchema = new mongoose.Schema({
	package_id: {
		type: String,
		required: true,
	},
	Item_id: {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
        ref: "Item"
	},
	name: {
		type: String,
		required: true,
	},
	no_units: {
		type: String,
		required: true,
	},
	package_price: {
		type: String,
		required: true,
	},
},
	{
		timestamps: true,
	}
);

module.exports = ItemPackage = mongoose.model("ItemPackage", ItemPackageSchema);