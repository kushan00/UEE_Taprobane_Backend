const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");

const ForiegnUser = require("../models/foriegnUserModel.js");
const MerchantModel = require("../models/merchantModel.js");
const WholeSaleBuyerModel = require("../models/wholeSaleBuyerModel.js");
const DeliveryPerson = require("../models/deliveryPersonModel.js");


var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZjk5OTFiMC1kNGUzLTExZWMtYmViYi0wOTUyMTdlNmY3ZDUiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY1MjY4MzIyMiwiZXhwIjoxOTY4MzAyNDIyLCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjY4MDE1Iiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.U_m2CPK2xVilqVHN6PMxwkaRaTUXjAD0v13HDcDPv5k';

var debug = true, verifySSL = false;



var jwtSecret = "mysecrettoken";

const registerUser = async (req, res) => {

  const { 
        fullName, 
        email, 
        password,  
        mobileno, 
        dateOfBirth,
        weight,
        height,    
    } = req.body;

    // generating user unique gym id
    var Tp_id = await uniqueID.generateID();

    
    var client = new ShoutoutClient(apiKey, debug, verifySSL);
    var message = {
    "content": {"sms": "Hello! "+fullName+" Your Registration is successfull..!" + "Your Taprobane ID is: "+Tp_id+"."},
    "destinations": [mobileno],
    "source": "ShoutDEMO",
    "transports": ["SMS"]
    };

    client.sendMessage(message, (error, result) => {
    if (error) {
    console.error('Error sending message!',error);
    } else {
    console.log('Sending message successful!',result);
    }
    });

    
  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      apiResponse.AlreadyExists(res,"User already exists",{user : user?.fullName});
      return 0; 
    }

    user = new User({
        Tp_id,
        fullName, 
        email, 
        password,  
        mobileno, 
        dateOfBirth,
        weight,
        height, 
    });

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      apiResponse.Success(res,"Register Success",{ token, userRole: user.userRole, user: user.fullName , userID : user.gym_id , _id:user?._id  })
    });
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const authUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) 
    {
        user = await Admin.findById(req.user.id);
        if(!user)
        {
            user = await Instructor.findById(req.user.id);
            if(!user)
            {
                apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                return 0;  
            }
        }
    }
    apiResponse.Success(res,"Auth Success",{ user: user })
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (!user) 
    {
        user = await Admin.findOne({ email });
        if(!user)
        {
            user = await Instructor.findOne({ email });
            if(!user)
            {
                apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
                return 0; 
            }
        }
    }
  

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
    }

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
      if (err) throw err;
      apiResponse.Success(res,"Login Success",{ token, userRole: user.userRole , user: user.fullName , userID : user?.gym_id ? user?.gym_id : "" , _id:user?._id  })
    });
  } catch (err) {
    console.log(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};


const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { fullName, mobileno, email } = req.body;

  const filter = { _id: id };
  const update = { 
       fullName: fullName,
       mobileno:mobileno,
       email : email,    
      };

  try {
  
  let data = await Admin.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"Admin Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}



module.exports = {
  registerUser,
  authUser,
  loginUser,
  updateAdmin
};
