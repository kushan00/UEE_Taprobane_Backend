const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
	item_id: {
		type: String,
		required: true,
	},
	//item id
	name: {
		type: String,
		required: true,
	},
	//name of the item
	description: {
		type: String,
		required: true,
	},
	//description of the item
	is_wholesale: {
		type: Boolean,
		required: true,
        default: 0
	},
	//is_wholesale of the item
	unit_price: {
		type: String,
		required: true,
	},
	//unit_price of the item
	image_url: {
		type: String,
		default: null
	},
	//image_url of the item
	owner : {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
        ref: "merchant"
	}
	//owner of the item

},
	{
		timestamps: true,
	}
);

module.exports = Item = mongoose.model("Item", ItemSchema);