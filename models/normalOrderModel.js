const mongoose = require("mongoose");

const normalOrderSchema = new mongoose.Schema({
    normalOrder_Id: {
        type: String,
        required: true,
    },

    foriegn_user_Id: {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
        ref: "foriegnUser"

    },

    products: {
        type: [],
        required: true,

    },

    payment_method: {
        type: String,
        required: true,
    },

    delivery_method: {
        type: String,
        required: true,
    },

    final_price: {
        type: String,
        required: true,
    },

    confirm_status: {
        type: Boolean,
        default: false
    },

    delivery_rider_id: {
        type: mongoose.Schema.Types.ObjectId,
		required: false,
        ref: "deliveryPerson"

    },

},

    {
        timestamps: true,
    }
);

module.exports = normalOrder = mongoose.model("normalOrder", normalOrderSchema);