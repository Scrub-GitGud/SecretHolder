const mongoose = require('mongoose');

const SecretSchema = new mongoose.Schema({
    myOwnerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    title:{
        type: String,
        required: true
    },
    username:{
        type: String
    },
    email:{
        type: String
    },
    phone: {
        type: String
    },
    password:{
        type: String
    },
    link:{
        type: String
    },
    note:{
        type: String
    },
    loggedin_with:{
        type: String
    },
    date:{
        type: String,
        default: Date.now()
    }
})

module.exports = xSecret = mongoose.model("SecretCollection", SecretSchema);


