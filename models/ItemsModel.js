const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
	item_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	is_wholesale: {
		type: Boolean,
		required: true,
        default: 0
	},
	unit_price: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		default: null
	},

},
	{
		timestamps: true,
	}
);

module.exports = Item = mongoose.model("Item", ItemSchema);