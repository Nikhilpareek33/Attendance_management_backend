const express = require('express')
const router = express.Router()
const signUpTeacher = require('../models/signUpTeacher')
const signUpStudent = require('../models/signUpStudent')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')


// checking the session 
router.post('/checksession',(req, res) =>{

    let decoded;
    try {
        decoded = jwt.verify(req.body.sessionID, process.env.JWT_KEY);
    } catch (err) {
        decoded = {id: undefined };
    }

    
    if (decoded.userId === undefined ){
        console.log("Sent checkSession status false");
        res.status(200).send({ status: false });
        return;
    }
    else {
        console.log("Sent checkSession status true");
        console.log("Decode token here " + decoded.classnumber);
        res.status(200).send({ 
            status: true,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            classnumber : decoded.classnumber,
            type: decoded.type
                        
        });
        return;
    }


})


// Sigin for Student
router.post('/student', (req, res) => {


    signUpStudent.find({email: req.body.email})
    .exec()
    .then(student =>{
        if(student.length >=1)
        {
            console.log("mail exist");
            return res.status(409).send("mail exist")
        }else
        {
            bcrypt.hash(req.body.password,10 ,
                 function(err, hash) {
        
                    if(err)
                    {
                        console.log("Errror of bcrypt");
        
                        return res.status(500).send("Error in bcrypt");
                    } else{
        
                        const signUpUser = new signUpStudent({
                
                            password: hash,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            fatherfirstname: req.body.fatherfirstname,
                            fatherlastname: req.body.fatherlastname,
                            mobilenumber : req.body.mobilenumber,
                            classnumber: req.body.classnumber
                    
                        })
                        
                        console.log("printing user");
                        console.log(signUpUser);

                        signUpUser.save()
                        .then(data =>{
                            console.log("This is Student data stored in the database");
                            res.status(201).send("Student data stored in the databse");
                        })
                        .catch( error =>{
                            console.log("error occured");
                            console.log(error.message);
                            res.send(error.message);
                        })
                    }
            });
        }

    })

    

   
})


// Signin for teachers
router.post('/teacher', (req, res) => {
    
    console.log(req.body);

    signUpTeacher.find({email: req.body.email})
    .exec()
    .then(teacher =>{
        if(teacher.length >=1)
        {
            return res.status(409).send(
                'mail exists'
            )
        }else
        {
            bcrypt.hash(req.body.password,10 ,
                 function(err, hash) {
        
                    if(err)
                    {
                        console.log("Errror of bcrypt");
        
                        return res.status(500).send(
                            err
                        )
                    } else{
        
                        const signUpUser = new signUpTeacher({
                
                            password: hash,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            mobilenumber : req.body.mobilenumber,
                            classnumber: req.body.classnumber
                    
                        })
                    
                        signUpUser.save()
                        .then(data =>{
                            console.log("Teacher data stored in the database");
                            res.status(201).send("Teacher data stored in the database");
                        })
                        .catch( error =>{
                            console.log("error in signup.js");
                            console.log(error.message);
                            res.send(error.message);
                        })
                    }
            });
        }

    })

    

   
})

module.exports = router