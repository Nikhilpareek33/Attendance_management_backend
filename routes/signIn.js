const express = require('express')
const router = express.Router()
const signUpTeacher = require('../models/signUpTeacher')
const signUpStudent = require('../models/signUpStudent')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

router.get('/', (req,res)=>{
    return res.status(200).send("You have reached the signin end point of api")
})

router.post('/', async (req,res)=>{

    console.log('pinged the sign in end point with post request');
    let a = [];
    let b = [];
    let c = [];


    await signUpTeacher.find({email:req.body.email})
    .exec()
    .then( user =>{
        a.push(...user);
        console.log("log teacher");
        console.log(user);
    })
  


    await signUpStudent.find({email:req.body.email})
    .exec()
    .then( user =>{
        console.log("log student");
        console.log(user);
        b.push(...user);
    })
    
    console.log("printing a and b respec");
    console.log(a);
    console.log(b);

    if(b.length <1 && a.length <1){

        return res.status(401).send('Auth failed mail not found'
        )
    }

    let database_number = 2;

    if(a.length >= 1)
    {
        database_number =1;
        c.push(...a);
    }

    if(b.length >= 1)
    {
        c.push(...b);
    }


    bcrypt.compare(req.body.password,c[0].password,(err,result)=>{
        if(err){
            
            return res.status(401).send(
                "failed in bcrypt"
            );
        }

        if(result){
           const token = jwt.sign({
                email : c[0].email,
                userId : c[0]._id,
                firstname : c[0].firstname,
                lastname: c[0].lastname,
                classnumber: c[0].classnumber,
                type: database_number
            },
            process.env.JWT_KEY,
            {
                expiresIn : "1h"
            })

            return res.status(200).send({
                sessionID: token,
            })
        }

        return res.status(401).send("Auth failed")

    })
      
    
})


module.exports = router