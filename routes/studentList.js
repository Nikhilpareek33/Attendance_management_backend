const express = require('express')
const router = express.Router()
const checkAuth = require("../Middleware/check-auth")
const signUpStudent = require('../models/signUpStudent')

router.get('/studentlist', async (req,res) =>{

    let student_array =[];

    await signUpStudent.find({})
    .exec()
    .then(arr => {

        student_array.push(...arr);
        // console.log(arr);

    })
    console.log("printing array");
    console.log(student_array);

    return res.status(200).send({
        result: student_array
    })
})

router.get('/:studentid', (req,res)=>{
    return res.status(200).json({
        message: "particular student of student fetched"
    })
})

module.exports = router