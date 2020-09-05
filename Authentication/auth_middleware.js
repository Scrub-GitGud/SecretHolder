const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next)=>{
    // ---------- Get token from header
    const token = req.header('x-auth-token')

    // ---------- Check if no token
    if(!token){
        return res.status(401).json({msg: 'NO TOKEN | AUTHORIZE DENIED. 😡'})
    }

    // ---------- Verify token if there is one
    try{
        const decode = jwt.verify(token, config.get('mySecret'))

        req.user = decode.user
        next()
    }
    catch(err){
        res.status(401).json({msg: 'catch | err!! in auth_middleware | wrong token 🖕🖕'})
    }
}