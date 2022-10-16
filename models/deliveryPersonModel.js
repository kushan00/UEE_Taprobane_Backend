const mongoose = require("mongoose");

const DeliveryPersonSchema = new mongoose.Schema({
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
    vehicle_type: {
		type: String,
		required: true,
	},
    vehicle_number: {
		type: String,
		required: true,
	},
    password: {
		type: String,
		required: true,
	}, 
	userRole: {
		type: String,
		default: "delivery_person",
	},
},
{
    timestamps: true,
}
);

module.exports = DeliveryPerson = mongoose.model("deliveryPerson", DeliveryPersonSchema);