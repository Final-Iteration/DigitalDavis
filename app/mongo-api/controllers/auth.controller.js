const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.services');
const authService = require('../services/auth.services');
const User = require('../models/user.model');

const signup = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const token = authService.issueJWT(user);
    res.status(httpStatus.CREATED).send({id: user._id, tokenObject: token});
});

const login = catchAsync(async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);
    if(!user){
        res.status(401).send({success: false, msg: "No account associated with that Email."});
    }else{
        if(user.passwordMatch(req.body.password)){
            const token = authService.issueJWT(user);
            res.status(200).send({id: user._id, tokenObject: token});
        }else { 
            res.status(401).send({ success: false, msg: "Incorrect password" });
        }
    }
});

module.exports = {
    signup,
    login,
};
