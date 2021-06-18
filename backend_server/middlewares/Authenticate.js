const jwt = require('jsonwebtoken')

let Authenticate = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg : 'No Token, authorization denied'});
    }

    //verify the token 

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.user;
        next();

    }
    catch(error){
        res.status(401).json({msg : 'Token is not valid'});
        
    }

}

module.exports = Authenticate;