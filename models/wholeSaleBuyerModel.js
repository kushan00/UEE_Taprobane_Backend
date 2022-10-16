const mongoose = require("mongoose");

const WholeSaleBuyerSchema = new mongoose.Schema({
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
		default: "wholesale_buyer",
	},
},
{
    timestamps: true,
}
);

module.exports = WholeSaleBuyer = mongoose.model("wholeSaleBuyer", WholeSaleBuyerSchema);