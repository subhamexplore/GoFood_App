const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "qwertyuioplkjhgfdsazxcvbnm";

router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({min:2}),
    body('password', 'minimum:6 characters').isLength({min:6})
],async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    const secPassowrd = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            password: secPassowrd,
            email: req.body.email,
            location: req.body.location,
        })
    res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post('/loginuser', [
    body('email').isEmail(),
],async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Try logging with correct credentials!"});
        }
        const pwdCompare = await bcrypt.compare(password, userData.password);
        if(!pwdCompare){
            return res.status(400).json({errors: "Try logging with correct credentials!"});
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({success: true, authToken: authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;