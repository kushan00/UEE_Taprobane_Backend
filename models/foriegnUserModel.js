const mongoose = require("mongoose");

const ForiegnUserSchema = new mongoose.Schema({
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
    country: {
		type: String,
		required: true,
	},
    password: {
		type: String,
		required: true,
	}, 
	userRole: {
		type: String,
		default: "foreign_user",
	},
},
{
    timestamps: true,
}
);

module.exports = ForiegnUser = mongoose.model("foriegnUser", ForiegnUserSchema);