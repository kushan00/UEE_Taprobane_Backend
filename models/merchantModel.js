const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
    Tp_id: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	mobileno: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    dateOfBirth: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	status: {
		type: String,
        default:null
	},
    password: {
		type: String,
		required: true,
	}, 
	userRole: {
		type: String,
		default: "merchant",
	},
},
{
    timestamps: true,
}
);

module.exports = Merchant = mongoose.model("merchant", MerchantSchema);

//merchant model