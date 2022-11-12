const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");

const ForiegnUser = require("../models/foriegnUserModel.js");
const MerchantModel = require("../models/merchantModel.js");
const WholeSaleBuyerModel = require("../models/wholeSaleBuyerModel.js");
const DeliveryPerson = require("../models/deliveryPersonModel.js");

const {sendSms} = require("../helpers/smsSender");

var jwtSecret = "mysecrettoken";

const registerUser = async (req, res) => {

  const { 
        fullName, 
        email, 
        password,  
        mobileno, 
        dateOfBirth,
        address,
        Selling_Items,
        country,
        vehicle_type,
        vehicle_number,   
        userRole         
    } = req.body;

    // generating user unique gym id
    var Tp_id = await uniqueID.generateID();

    
 

    
  try {

      if(userRole == "merchant"){

        let oldUser = await MerchantModel.findOne({ email });

        if (oldUser) {
          apiResponse.AlreadyExists(res,"Merchant already exists",{user : oldUser?.fullName});
          return 0; 
        }

        const user = new MerchantModel({
            Tp_id,  
            fullName,
            email,
            password,
            mobileno,
            dateOfBirth,
            address,
            Selling_Items,            
        });

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
          apiResponse.Success(res,"Register Success",{ token, userRole: user?.userRole, userName: user?.fullName , userID : user.Tp_id , _id:user?._id  })
          sendSms(fullName,Tp_id,mobileno);
        });



      }
      else if(userRole == "wholesale_buyer"){

        let oldUser = await WholeSaleBuyerModel.findOne({ email });

        if (oldUser) {
          apiResponse.AlreadyExists(res,"wholesale_buyer already exists",{user : oldUser?.fullName});
          return 0; 
        }

        const user = new WholeSaleBuyerModel({
            Tp_id,
            fullName,
            email,
            password,
            mobileno,
            dateOfBirth,
            address,
        });
        
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
          apiResponse.Success(res,"Register Success",{ token, userRole: user?.userRole, userName: user?.fullName , userID : user.Tp_id , _id:user?._id  })
          sendSms(fullName,Tp_id,mobileno);
        });

      }
      else if(userRole == "delivery_person"){

        let oldUser = await DeliveryPerson.findOne({ email });

        if (oldUser) {
          apiResponse.AlreadyExists(res,"delivery_person already exists",{user : oldUser?.fullName});
          return 0; 
        }

        const user = new DeliveryPerson({
            Tp_id,
            fullName,
            email,
            password,
            mobileno,
            dateOfBirth,
            address,
            vehicle_type,
            vehicle_number,
        });

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
          apiResponse.Success(res,"Register Success",{ token, userRole: user?.userRole, userName: user?.fullName , userID : user.Tp_id , _id:user?._id  })
          sendSms(fullName,Tp_id,mobileno);
        });

      }
      else if(userRole == "foreign_user"){

        let oldUser = await ForiegnUser.findOne({ email });

        if (oldUser) {
          apiResponse.AlreadyExists(res,"foreign_user already exists",{user : oldUser?.fullName});
          return 0; 
        }

        const user = new ForiegnUser({
            fullName,
            email,
            password,
            mobileno,
            dateOfBirth,
            address,
            country,
            Tp_id,
        });
        
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
          apiResponse.Success(res,"Register Success",{ token, userRole: user?.userRole, userName: user?.fullName , userID : user.Tp_id , _id:user?._id  })
          sendSms(fullName,Tp_id,mobileno);
        });
      }
      else{
        return  apiResponse.ServerError(res,"Registration Failed",{err:email});
      }

  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const authUser = async (req, res) => {
  try {
    let user = await DeliveryPerson.findById(req.user.id);
    if (!user) 
    {
        user = await WholeSaleBuyerModel.findById(req.user.id);
        if(!user)
        {
            user = await MerchantModel.findById(req.user.id);
            if(!user)
            {
                user = await ForiegnUser.findById(req.user.id);
                if(!user)
                {
                  apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                  return 0;  
                }
            }
        }
    }
    apiResponse.Success(res,"Auth Success",{ user: user })
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const getUser = async (req, res) => {
  try {
    let user = await DeliveryPerson.findById(req.params.id);
    if (!user) 
    {
        user = await WholeSaleBuyerModel.findById(req.params.id);
        if(!user)
        {
            user = await MerchantModel.findById(req.params.id);
            if(!user)
            {
                user = await ForiegnUser.findById(req.params.id);
                if(!user)
                {
                  apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                  return 0;  
                }
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
    let user = await DeliveryPerson.findOne({ email });
    if (!user) 
    {
        user = await WholeSaleBuyerModel.findOne({ email });
        if(!user)
        {
            user = await MerchantModel.findOne({ email });
            if(!user)
            {
                user = await ForiegnUser.findOne({ email });
                if(!user)
                {
                  apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
                  return 0; 
                }
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
      apiResponse.Success(res,"Login Success",{ token, userRole: user?.userRole , user: user?.fullName , userID : user?.Tp_id ? user?.Tp_id : "" , _id:user?._id  })
    });
  } catch (err) {
    console.log(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await DeliveryPerson.findById(req.params.id
    );
    if (!user)
    {
        user = await WholeSaleBuyerModel.findById(req.params.id);
        if(!user)
        {
            user = await MerchantModel.findById(req.params.id
            );
            if(!user)
            {
                user = await ForiegnUser.findById(req.params.id);
                if(!user)
                {
                  apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                  return 0;
                }
            }
        }
    }
    
    const { fullName, email, mobileno, dateOfBirth, address, country, vehicle_type, vehicle_number } = req.body;

    // Build profile object
    const profileFields = {};
    if (fullName) profileFields.fullName = fullName;
    if (email) profileFields.email = email;
    if (mobileno) profileFields.mobileno = mobileno;
    if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
    if (address) profileFields.address = address;
    if (country) profileFields.country = country;
    if (vehicle_type) profileFields.vehicle_type = vehicle_type;
    if (vehicle_number) profileFields.vehicle_number = vehicle_number;

    user = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      { $set: profileFields },
      { new: true }
    );

    if (!user)
    {
        user = await WholeSaleBuyerModel.findByIdAndUpdate(
            req.params.id,
            { $set: profileFields },
            { new: true }
          );
          if(!user)
          {
              user = await MerchantModel.findByIdAndUpdate(
                req.params.id,
                { $set: profileFields },
                { new: true }
              );
              if(!user)
              {
                  user = await ForiegnUser.findByIdAndUpdate(
                    req.params.id,
                    { $set: profileFields },
                    { new: true }
                  );
                  if(!user)
                  {
                    apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                    return 0;
                  }
              }
          }
    }
    apiResponse.Success(res,"Update Success",{ user: user })
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

const deleteUser = async (req, res) => {
  try {
    let user = await DeliveryPerson.findById(req.user.id
    );
    if (!user)
    {
        user = await WholeSaleBuyerModel.findById(req.user.id);
        if(!user)
        {
            user = await MerchantModel.findById(req.user.id
            );
            if(!user)
            {
                user = await ForiegnUser.findById(req.user.id);
                if(!user)
                {
                  apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                  return 0;
                }
            }
        }
    }
    await DeliveryPerson.findByIdAndRemove(req.user.id);
    if (!user)
    {
        user = await WholeSaleBuyerModel.findByIdAndRemove(req.user.id);
        if(!user)
        {
            user = await MerchantModel.findByIdAndRemove(req.user.id
            );
            if(!user)
            {
                user = await ForiegnUser.findByIdAndRemove(req.user.id);
                if(!user)
                {
                  apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
                  return 0;
                }
            }
        }
    }
    apiResponse.Success(res,"Delete Success",{ user: user })
  } catch (err) {
    console.error(err.message);
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

//const updateAdmin = async (req, res) => {
  // const { id } = req.params;
  // const { fullName, mobileno, email } = req.body;

  // const filter = { _id: id };
  // const update = { 
  //      fullName: fullName,
  //      mobileno:mobileno,
  //      email : email,    
  //     };

  // try {
  
  // let data = await Admin.findOneAndUpdate(filter, update);
  // console.log(data);
  // apiResponse.Success(res,"Admin Details Updated", {data:data});

  // } catch (error) {
  //   apiResponse.ServerError(res,"Server Error",{err:error});
  // }
//}



module.exports = {
  registerUser,
  authUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  //updateAdmin
};
