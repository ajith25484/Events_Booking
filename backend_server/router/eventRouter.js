const express = require('express');
const Authenticate = require('../middlewares/authenticate');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Event = require('../models/Events');

/*
    Event Router
    Usage: Upload an event
    URL: http://127.0.0.1:5000/api/events/upload
    params: name, image, date, type, price, info
    method: Post
    access: private
*/
router.post('/upload', Authenticate, [
    body('name').notEmpty().withMessage('Name is required'),
    body('image').notEmpty().withMessage('image is required'),
    body('date').notEmpty().withMessage('date is required'),
    body('type').notEmpty().withMessage('type is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('info').notEmpty().withMessage('info is required')
], async(req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors : errors.array()})
    }
    try{
        let{name, image, date, type, price, info} = req.body;
        let user = req.user.id;
        let event = new Event({user, name, image, date, type, price, info});
        event = await event.save();
        res.status(200).json({
            msg : 'Event upload is success',
            event : event
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
    Event Router
    Usage: get free events
    URL: http://127.0.0.1:5000/api/events/free
    params: no-fields
    method: get
    access: public
*/
router.get('/free', async(req, res) => {
    try{
        let events = await Event.find({type : 'FREE'});
        res.status(200).json({events:events});
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
    Event Router
    Usage: get pro events
    URL: http://127.0.0.1:5000/api/events/pro
    params: no-fields
    method: get
    access: private
*/
router.get('/pro',Authenticate, async(req, res) => {
    try{
        let events = await Event.find({type : 'PRO'});
        res.status(200).json({events:events});
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
module.exports = router;