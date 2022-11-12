const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
    Tp_id: {
		type: String,
		required: true,
	},
	//taprobana ID
	fullName: {
		type: String,
		required: true,
	},
	//fullname of the merchnat
	mobileno: {
		type: String,
		required: true,
	},
	//mobile number of the merchant
	email: {
		type: String,
		required: true,
		unique: true,
	},
	//email of the merchant
    dateOfBirth: {
		type: String,
		required: true,
	},
	//date of birth of the merchant
	address: {
		type: String,
		required: true,
	},
	//address of the merchant
	status: {
		type: String,
        default:null
	},
	//status of the merchant
    password: {
		type: String,
		required: true,
	}, 
	//password of the merchant
	userRole: {
		type: String,
		default: "merchant",
	},
	//user role of the merchant
},
{
    timestamps: true,
}
);

module.exports = Merchant = mongoose.model("merchant", MerchantSchema);

//merchant model