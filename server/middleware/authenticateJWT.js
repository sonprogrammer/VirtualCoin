const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
      }
    
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(400).json({message: 'invalid token'})
            }
            req.user = user
            next()
        })
    }else{
        res.status(400).json(({message: 'no token'}))
    }
}

module.exports = authenticateJWT