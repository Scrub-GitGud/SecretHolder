const express = require("express");
const { check, validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const ROUT = express.Router();

const auth_middleware = require('../Authentication/auth_middleware')
const SecretModel = require("../Database/SecretModel")
const UserModel = require("../Database/UserModel")


// @ Get Current Users Secret --->  GET api/secrets | with middleware
ROUT.get("/", auth_middleware, async (req, res)=> {
    try{
        const foundSecrets = await SecretModel.find({myOwnerID: req.user}).sort({ date: -1 });
        res.json(foundSecrets);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('catch | Server error | @secrets')
    }
});


// @ add a secret | POST api/secrets | with middleware
ROUT.post("/", 
[
    auth_middleware,
    [
        check("title", "Title cannot be empty 😡😡😡").not().isEmpty(),
    ]
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const foundUser = await UserModel.findById(req.user).select("-password")

        const secretFields = {
            myOwnerID: req.user,
            title: req.body.title,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            link: req.body.link,
            note: req.body.note
        }

        const newSecret = await new SecretModel(secretFields)

        newSecret.save();

        res.json(newSecret);
    } 
    catch (err) {
        console.log(err.message);
        res.status(400).send("catch | err while adding a secret")
    }
})


// @ Edit a secret | PUT api/secrets/:id | with middleware
ROUT.put('/:id', auth_middleware, async (req, res) => {
    const {title, username, email, phone, password, link, note} = req.body;
  
    const secretFields = {};
    if (title) secretFields.title = title;
    if (username) secretFields.username = username;
    if (email) secretFields.email = email;
    if (phone) secretFields.phone = phone;
    if (password) secretFields.password = password;
    if (link) secretFields.link = link;
    if (note) secretFields.note = note;

    try {
      let secret = await SecretModel.findById(req.params.id);
  
      if (!secret) return res.status(404).json({msg: 'Secret not found'});
  
      // Make sure user owns secret
      if (secret.myOwnerID.toString() !== req.user) {
        return res.status(401).json({msg: 'I dont own this secret'});
      }

      secret = await SecretModel.findByIdAndUpdate( req.params.id, {$set: secretFields}, {new: true} );

      res.json(secret);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error While Updating Secret');
    }
});
  

// @ Delete a secret | DELETE api/secrets/:id | with middleware
ROUT.delete('/:id', auth_middleware, async (req, res) => {
    try {
        let secret = await SecretModel.findById(req.params.id);

        if (!secret) return res.status(404).json({msg: 'Secret not found'});

        // Make sure user owns contact
        if (secret.myOwnerID.toString() !== req.user) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        await SecretModel.findByIdAndRemove(req.params.id);

        res.json({msg: 'Secret removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error While Deleting Secret');
    }
});


module.exports = ROUT;