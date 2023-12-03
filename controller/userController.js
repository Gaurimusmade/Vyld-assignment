const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// 1. *POST /api/users/register*: Allows a new user to create an account.
module.exports.register = async (req,res) => {
    try{
       const {Name,username,bio,age,password}=req.body;
       if(!(Name && username && bio && age && password)){
         res.status(400).send({Message :"All fields are compulsory."})
       }
       if(await User.isUsernameExists(req.body.username) == true){
        return res.status(409).json({message : "Email already exists, try with different email"});
       }
        const hashPassword = await bcrypt.hash(password,10);
        const userData = {
            ...req.body,
            password : hashPassword
        }
        await User.newUser(userData);
        res.status(201).json({message : "User registration successful"});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
}


// 2. *POST /api/users/login*: Authenticates an existing user.
module.exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const userData = await User.varifyUser(username,password);
        if(userData == null){
            return res.status(401).json({message : "Username and password does not match"});
        }
        let accessToken = jwt.sign({...userData} , process.env.TOKEN_SECRET,{})
        return res.status(200).json({message : "User login successful",accessToken});
    }catch(err){
        res.status(500).json({error : "Internal server error"});
    }
}



// 3.*GET /api/users/details*: Retrieves the details of the logged-in user.
module.exports.getUserDetails = async (req, res) => {
    try{
        const userData=req.user;
        if(userData.length == 0)
            res.status(404).json({message : "User not found"});
        res.status(200).json(userData);
    }catch(err){
        res.status(500).json({error: "Internal server error"});
    }
}

// 4.*PUT  /api/users/update*:  Allows a user to update their profile details.
module.exports.updateUser = async (req, res) => {
    try{
        const userid=req.user.ID;
        let userData = {
            ID : userid,
            Name : req.body.Name,
            username : req.body.username,
            bio : req.body.bio,
            age : req.body.age
        }
        await User.updateUser(userData);
        res.status(200).json({message : "User updated successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

// 5.*DELETE /api/users/delete*:  Allows a user to permanently delete their account.
module.exports.deleteUser = async (req, res) => {
    try{
        const id=req.user.ID;
        console.log(id);
        await User.deleteUser(id);
        res.status(200).json({message : "User deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

// 6.*POST /api/users/logout*: Logs out the user, invalidating their current authentication token.
module.exports.logout = async (req, res) => {
    try{
        const token = req.headers.authorization;
        User.deleteToken(token);
        res.json({ message: 'Logout successful' });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

