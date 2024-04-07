const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const cookieParser = require("cookie-parser")
const {createTokens,validateTokenStudent,validateTokenMentor,tokentoDB} = require('./JWT')
const bcrypt = require('bcryptjs')
const Student = require('./model/Student');
const Mentor = require('./model/Mentor');
const teacherSocket = require('./model/TeacherSocket')
require("dotenv").config();
const Database = process.env.DB;
mongoose.connect(Database).then(()=>{
    console.log('connection successfull')
}).catch((e)=>{
    console.log('connection failed')
});
const app = express();
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(cookieParser());
const http = require("http")
const TeacherSocket = require('./model/TeacherSocket')
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: [ "GET", "POST" ]
    }
})

io.on("connection", (socket) => {
	socket.emit("me", socket.id)
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})
	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})
app.post('/mentorAvailable',validateTokenMentor,(req,res)=>{
    if(!req.Mentor){
        res.status(400).json('token cannot be verified')
    }
    else{
        const ioToken = req.body.ioToken;
        console.log('token and email are',req.body.ioToken,req.Mentor.email)
        tokentoDB(ioToken,req.Mentor.email);
        // const mentorEmail = req.body.teacherEmail;
        
        // console.log(mentorEmail)
        // res.status(200).json("Status online")
    }
})

app.get('/',async (req,res)=>{
    try{
        const animeimgs=await imginfo.find({})
        return res.status(200).json({
            data:animeimgs
        })
    }catch(e){
        console.log('error occured-')
        res.status(400).send('error')
    }
})

app.get('/addMentor',async (req,res)=>{
    
    try{
        addanime();
        res.status(200).send('working ok')
    }catch(e){
        res.status(400).send('error in page')
    }
})

// user registration and login

app.post('/registerStudent', async (req, res) => {
    const { email, password,branch } = req.body;
    if (!(email && password&&branch)) {
        res.status(400).send('All fields are required');
    }

    const existingUser = await Student.findOne({ email })
    if (existingUser) {
        res.status(400).send('User already Exists');
    }
    else{
        bcrypt.hash(password, 10).then((hash) => {
            Student.create({
                email: email,
                branch:branch,
                password: hash
            }).then(() => res.status(200).json("Student Registered")).catch((err) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
            })
        });
    }
    })
app.post('/registerMentor', async (req, res) => {
    const { email, password,subjects} = req.body;
    console.log("subjects are:=",subjects)
    if (!(email && password&& subjects)) {
        res.status(400).send('All fields are required');
    }

    const existingUser = await Mentor.findOne({ email })
    if (existingUser) {
        res.status(400).send('User already Exists');
    }
    else{

        bcrypt.hash(password, 10).then((hash) => {
            Mentor.create({
                email: email,
                subjects:subjects,
                available:true,
                password: hash
            }).then(() => res.status(200).json("Mentor Registered")).catch((err) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
            })
        });
    }
    })
app.post('/loginStudent',async (req,res)=>{
    const {email,password}=req.body;
    console.log('login api hit')
    const user = await Student.findOne({email:email});
    if(!user)
    res.status(400).send("user does not exist");
    else{
        bcrypt.compare(password,user.password).then((match)=>{
            if(!match){
                res.status(400).send("wrong password")
            }
            else{
                const accessToken=createTokens(user)
                res.cookie("access-token",accessToken,{
                    maxAge:60*60*24*30*1000,
                    // httpOnly:true
                });
                res.status(200).send('Logged in')
            }
        })
    }
})
app.post('/loginMentor',async (req,res)=>{
    const {email,password}=req.body;
    console.log('login api hit')
    const user = await Mentor.findOne({email:email});
    if(!user)
    res.status(400).send("user does not exist");
    else{
        bcrypt.compare(password,user.password).then((match)=>{
            if(!match){
                res.status(400).send("wrong password")
            }
            else{
                const accessToken=createTokens(user)
                res.cookie("access-token",accessToken,{
                    maxAge:60*60*24*30*1000,
                    // httpOnly:true
                });
                res.status(200).send('Logged in')
            }
        })
    }
})

app.get('/profileStudent',validateTokenStudent,(req,res)=>{
    res.json(req.Student);
})  
app.get('/profileMentor',validateTokenMentor,(req,res)=>{
    res.json(req.Mentor);
})
app.post('/getMentor',validateTokenStudent,async (req,res)=>{
    const subject = req.body.subject;
    console.log(subject)
    if(!subject){
        res.status(400).send("enter subject value")
    }
    else{

        Mentor.find({subjects:{$all : 'OOPS'}})
        const person =await Mentor.find({subjects:subject})
        const mentorarray = person.map((obj)=>{
            console.log(obj.email)
            if(obj.available==true){
                const teacherSocket=TeacherSocket.findOne({email:obj.email})
                if(teacherSocket){

                    return [obj.email,teacherSocket.socketID]
                }
            }
        })
        res.json(mentorarray)
        console.log(person)
    }
})
server.listen(5000,()=>{
    console.log('server is working')
})