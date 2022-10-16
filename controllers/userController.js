const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const passwordGenerator = require("../helpers/passwordGenerator.js");
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");
const workoutModel = require("../models/workoutModel");
const dietModel = require("../models/dietModel");
var ShoutoutClient = require('shoutout-sdk');

const createUser = async (req, res) => {
  
  const { 
    fullName, 
    email, 
    mobileno, 
    dateOfBirth,
    password,
    weight,
    height,    
} = req.body;



try {
// See if user exists
let user = await User.findOne({ email });

    if (user) {
      apiResponse.AlreadyExists(res,"User already exists",{user : user?.fullName});
      return 0; 
    }

    // generating user unique gym id
    var Tp_id = await uniqueID.generateID();



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

    //console.log("user",user);

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    apiResponse.Success(res,"Add New User Success",{user: user});

    } catch (err) {
    console.error(err);
    apiResponse.ServerError(res,"Server Error",{err:err});
    }
};





const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    apiResponse.Success(res,"All Users Retrive Success",{users: users });
  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    apiResponse.Success(res,"All Users Retrive Success",{users: users });
  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
};

const updateUserInstructor = async (req, res) => {
  const { id } = req.params;
  const {instructor}= req.body;

  const filter = { gym_id: id };
  const update = { instructor: instructor };

  try {
  
  let data = await User.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"User Instructor Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}

const updateUserMemberShip = async (req, res) => {
  const { id } = req.params;
  const {memberShip}= req.body;

  const filter = { gym_id: id };
  const update = { memberShip: memberShip };

  try {
  
  let data = await User.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"User memberShip Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, mobileno, email , dateOfBirth ,  weight ,height  } = req.body;

  const filter = { _id: id };
  const update = { 
       fullName: fullName,
       mobileno:mobileno,
       email : email,
       dateOfBirth : dateOfBirth,
       weight : weight,
       height : height      
      };

  try {
  
  let data = await User.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"User Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}


const deleteUser = async (req, res) => {
  const { id } = req.params;

  let data = await User.findByIdAndRemove(id);

  apiResponse.Success(res, "User Deleted", {data:data});
}

const getUserWorkOutAndDietPlans = async (req, res) => {
  const { id } = req.params;
  var selectedDietPaln = null;
  var selectedWorkoutPlan = null;
  console.log("get plans ID",id);

  try {
  const workouts = await workoutModel.findOne({"user_id":id});
  const diets = await dietModel.findOne({"user_id":id});
  console.log("workouts",workouts);
  console.log("diets",diets);
  if(workouts){
    selectedWorkoutPlan = workouts;
  }
  if(diets){
    selectedDietPaln = diets;
  }

  if(selectedDietPaln != null || selectedWorkoutPlan != null){
      apiResponse.Success(  
        res,
        "User WorkOut and Diet Plans", 
        {data:{
              workout:selectedWorkoutPlan,
              diet:selectedDietPaln,
              user:id
            }
        }
      );
  }else{
    apiResponse.ServerError(res,"Server Error",{err:"No such plans"});
  }



  } catch (error) {

  }



}


module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUserInstructor,
  updateUserMemberShip,
  updateUser,
  deleteUser,
  getUserWorkOutAndDietPlans
};
