import { UserSchema } from "../modals/UserSchema.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';


export const  getUsers = async (_, res) => {
    const users = await UserSchema.find()
    .then(user => res.json(
        {success: true,
            user}))
    .catch(err => res.status(404).json(err));
};

export const createUser = async (req, res)=>{
    
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await UserSchema.findOne({email: req.body.email})
      if(user != null) {
        return res.json({error:"User already exists"});
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      try{
            user = await UserSchema.create({
            name:req.body.name, 
            password: secPass,
            email: req.body.email,
            isAdmin: false
        });
        
        const payload = {
            userId: user._id, 
            isAdmin: false 
        };
        const token = jwt.sign(payload, process.env.jwtSecret);
        res
        .status(201)
        .cookie("token", token)
        .json({success:true})
    }catch(err) {
        res.status(404).json("Internal Server Error");
    };

  };

  export const createAdmin = async (req, res)=>{
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await UserSchema.findOne({email: req.body.email})
    if(user != null) {
      return res.json({error:"Admin already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    try{
          user = await UserSchema.create({
          name:req.body.name, 
          password: secPass,
          email: req.body.email,
          isAdmin: true
      });
      
      const payload = {
          userId: user._id, 
          isAdmin: true
      };
      const token = jwt.sign(payload, process.env.jwtSecret);
      res.status(201);
        
        res.cookie("token", token);
        res.json({success:true});
  }catch(err) {
      res.status(404).json("Internal Server Error");
  };

};

  export const loginUser =  async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json({errors:errors});
    }
    const {email, password}  = req.body;
    try{
      let user = await UserSchema.findOne({email});
      if(!user){
        return res.status(400).json({error:"Invalid Credentials"})
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Invalid Credentials"})
      }
      const payload = {
        userId: user._id, 
        isAdmin: user.isAdmin ? true : false, 
      };
      const token = jwt.sign(payload, process.env.jwtSecret);
      res.status(201);
        
        res.cookie("token", token);
        res.json({success:true});
    }catch(error){
      res.status(500).json({error:"Internal server Error"});
    }
  };
  export const logoutUser = async (req,res) =>{

    res.clearCookie('token').redirect('/login');

  };
  export const deleteUser = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.id);
        res.send(res.json(
            {success:true}));
    } catch(error) {
        res.status(500).json({ error: "Internal server Error" });
    }
};
