const User = require("../../models/UserModel");
const session = require('express-session');
const { body } = require('express-validator');


exports.signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

 if(name=='' || email=='' || password==''){
  return res.status(400).json({success :false , message :"Empty fields"});

 }

  const eregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 if (!eregex.test(email)) {
  return res.status(400).json({ success: false, message: "Follow proper email format" });
} 

  const pregex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  if(!pregex.test(password)){
  return res.status(400).json({ success: false, message: "Enter strong password" });
  }


  let user = await User.findOne({email :req.body.email});
  if(user){
    return res.json({ success : false , message: "User already exists"});
  }
  else{
    let data = new User(req.body);
    let result = await data.save();
    return res.json({success:true , message :"Data entered Successfully" , result});
  }
};




exports.LogIn = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  
 if(email=='' || password==''){
  return res.status(400).json({success :false , message :"Empty fields"});

 }

  const eregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 if (!eregex.test(email)) {
  return res.status(400).json({ success: false, message: "Follow proper email format" });
} 

  const pregex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  if(!pregex.test(password)){
  return res.status(400).json({ success: false, message: "Enter password" });
  }

  try{

    const user = await User.findOne({email :req.body.email});
    if(!user){
      return res.json({success: false , message :"Invalid Email"});
    }
    
      const Match =await user.comparePassword(req.body.password);
      if(!Match){
        return res.json({success: false , message :"Password Not Found"});
      }
      else{
        
          req.session.user=user;
          return res.json({success: true , message :"Login Successfully" , user});
        }

      

  }
    catch(error){
      return res.json({success:false , message : "Error occured"});
    }

    
}

exports.LogOut = async (req, res) => {
  req.session.destroy();
  return res.json({success:true , message : "logout occured"});
}