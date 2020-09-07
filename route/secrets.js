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
        const foundUser = await UserModel.findById(req.user).select("-password")
        
        // Insert Default Items
        const item1 = new SecretModel({myOwnerID: req.user, title: "instagram", username: "Demo Items", email:"demo@demo.com", phone:"", password:"secret password", link: "https://www.instagram.com/", note: "This is a demo, delete these.", loggedin_with:"with-facebook"})
        const item2 = new SecretModel({myOwnerID: req.user, title: "Google", username: "", email:"", phone:"01799555154", password:"", link: "https://www.google.com/", note: "This is a demo", loggedin_with:"with-google"})
        const item3 = new SecretModel({myOwnerID: req.user, title: "twitter", username: "Random", email:"", phone:"", password:"", link: "", note: "", loggedin_with:"with-github"})
        const item4 = new SecretModel({myOwnerID: req.user, title: "github", username: "", email:"", phone:"", password:"", link: "", note: "This is a demo", loggedin_with:"with-facebook"})
        const item5 = new SecretModel({myOwnerID: req.user, title: "deviantart", username: "", email:"", phone:"", password:"", link: "", note: "This is a demo", loggedin_with:"with-google"})
        const item6 = new SecretModel({myOwnerID: req.user, title: "artstation", username: "", email:"", phone:"", password:"", link: "", note: "", loggedin_with:"with-facebook"})
        const item7 = new SecretModel({myOwnerID: req.user, title: "quora", username: "", email:"", phone:"", password:"", link: "", note: "", loggedin_with:"with-google"})
        const item8 = new SecretModel({myOwnerID: req.user, title: "dribbble", username: "", email:"", phone:"", password:"", link: "", note: "", loggedin_with:"with-facebook"})
        const item9 = new SecretModel({myOwnerID: req.user, title: "stackoverflow", username: "", email:"", phone:"", password:"", link: "https://www.stackoverflow.com/", note: "", loggedin_with:""})
        const item10 = new SecretModel({myOwnerID: req.user, title: "discord", username: "", email:"", phone:"", password:"", link: "https://www.discord.com/", note: "", loggedin_with:"with-facebook"})
        const item11 = new SecretModel({myOwnerID: req.user, title: "mega", username: "", email:"", phone:"", password:"", link: "", note: "", loggedin_with:"with-facebook"})
        const defaultItems = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11]
        if(foundUser.first_time_logging === true) {
            await SecretModel.insertMany(defaultItems)
        }
        foundUser.first_time_logging = false
        await foundUser.save()
        
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
            note: req.body.note,
            loggedin_with: req.body.loggedin_with
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
    const {title, username, email, phone, password, link, note, loggedin_with} = req.body;
    
    const secretFields = {};
    if (title) secretFields.title = title;
    if (username) secretFields.username = username;
    if (email) secretFields.email = email;
    if (phone) secretFields.phone = phone;
    if (password) secretFields.password = password;
    if (link) secretFields.link = link;
    if (note) secretFields.note = note;
    if (loggedin_with) secretFields.loggedin_with = loggedin_with;

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