const authenticate = require('../middlewares/Authenticate')

const express = require('express')
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');



/*
    User Router
    Usage: Register a User
    URL: http://127.0.0.1:5000/api/users/register
    params: name, email, password
    method: Post
    access: Public
*/
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')
], async(req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }
    try{
        let {name, email, password} = req.body;

        //check if user already exists or not
        let user = await User.findOne({email : email});
        if(user){
            return res.status(401).json({errors : [{msg : 'user is already exists'}]})
        }

        //encrypt the password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        //avatar url
        let avatar = gravatar.url(email, {
            s : '200',
            r : 'pg',
            d : 'mm'
        })

        let isAdmin = false;

        //save to db
        user = new User({name, email, password, avatar, isAdmin})
        user = await user.save();
        res.status(200).json({
            msg : 'Registration is success'
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            errors : [
                {msg : error.message}
            ]
        })

    }

})

/*
    User Router
    Usage: Login a User
    URL: http://127.0.0.1:5000/api/users/login
    params: email, password
    method: Post
    access: Public
*/
router.post('/login',[
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('password is required')
], async(req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()})
    }
    try{
        let {email, password} = req.body;

        // check is user exists
        let user = await User.findOne({email : email})
        if(!user){
            return res.status(401).json({errors : [{msg : 'Invalid Credentials'}]})
        }

        //check the password
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({errors : [{msg : 'Invalid Credentials'}]})
        }

        //create JWT token
        let payload = {
            user : {
                id : user.id,
                name : user.name
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
            if(err) throw err;
            res.status(200).json({
                msg:'Login success',
                token : token,
                user : user
            })
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            errors : [
                {msg : error.message}
            ]
        })
    }
})

/*
    User Router
    Usage: Get an User  details
    URL: http://127.0.0.1:5000/api/users/
    params: no-fields
    method: Get
    access: Private
*/
router.get('/', authenticate, async (req, res) => {
    try {
        let user = await User.findOne({_id :req.user.id})
        res.status(200).json({user:user})
    } catch(error){
        console.error(error);
        res.status(500).json({
            errors : [
                {msg : error.message}
            ]
        })
    }
})
module.exports = router;
