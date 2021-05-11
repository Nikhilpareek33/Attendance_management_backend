const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const signUp = require('./routes/signUp')
const signIn = require('./routes/signIn')
const studentList = require('./routes/studentList')
const faltu = require('./routes/faltu')

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const port = process.env.PORT || 4000;

const FRONT_END_URL = "http://localhost:3000/"

app.use(express.json());
server.use(cors({ credentials: true, origin: FRONT_END_URL }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

mongoose.connect(process.env.DATABASE_ACCESS,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{console.log("Wohoooo Db connected")})

app.use("/",faltu)
app.use('/signup', signUp)
app.use('/signin',signIn)
app.use('/details',studentList)

app.listen(port,() => console.log("server is running " + port))

