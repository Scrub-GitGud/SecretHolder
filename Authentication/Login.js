const express = require("express");
const { check, validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const ROUT = express.Router();

const auth_middleware = require('./auth_middleware')
const UserModel = require("../Database/UserModel")

//@ Get Current Users Data --->  GET api/login | with middleware
ROUT.get("/", auth_middleware, async (req, res)=> {
    try{
        const userData = await UserModel.findById(req.user).select("-password")
        res.json(userData);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('route/api/Login.js | Get ERROR.')
    }
});


// @ Authenticate User & Get Token | POST api/login
ROUT.post("/",
[
    check("email","Email can't be empty.").isEmail(),
    check("password","Password can't be empty.").exists()
],
async (req, res)=> {
    // ---------- Check for validation Errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){  // if errors are not empty, that means it has errors
        return res.status(400).json({ errors: errors.array() });
    }

    let {email, password} = req.body;

    try{
        // ---------- See if user exist
        let user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({ msg: "User doesn't exist | Didn't find the user" })
            // used return cz there is another res below
        }

        // ---------- Check Password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({ msg: "Password doesn't match" })
        }

        // ---------- Return jsonwebtoken
        const payload = {
            user: user.id
        }

        jwt.sign(payload, config.get('mySecret'), {expiresIn: 36000}, (err, token)=>{
            if(err) throw err;
            res.json({token})
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send("catch | Server error | @Login | JWT")
    }
});

module.exports = ROUT;