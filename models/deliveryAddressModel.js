const mongoose = require("mongoose"); 

const DeliveryAddressSchema = new mongoose.Schema({

    address_owner:{
        type:String,
        required:true,
    },
    addressLine1:{
        type:String,
        required:true,
    },
    addressLine2:{
        type:String,
        required:true,
    },
    mobileno:{
        type:String,
        required:true,
    }
},
{
	timestamps: true,
}
);

module.exports = DeliveryAddress = mongoose.model("DeliveryAddress", DeliveryAddressSchema);
