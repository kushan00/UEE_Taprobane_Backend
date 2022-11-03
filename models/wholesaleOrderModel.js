const mongoose = require("mongoose");

const wholesaleOrderSchema = new mongoose.Schema({
    wholesaleOrder_Id: {
        type: String,
        required: true,
    },

    wholesalebuyer_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "wholeSaleBuyer"

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
        default: 0
    },

    delivery_rider_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "deliveryPerson"

    },

},

    {
        timestamps: true,
    }
);

module.exports = wholesaleOrder = mongoose.model("wholesaleOrder", wholesaleOrderSchema);