//import express
const express=require('express')

//importing dataservice.js index.js
const dataService=require('./services/dataservice')

//import jsonwebtoken
const jwt=require('jsonwebtoken')


//import cors
const cors=require('cors')





//create app using express
const app=express()

//use cors to specify origin
app.use(cors({
    origin:'http://localhost:4200'
}))





//to parse json
app.use(express.json())










//resolve http request from client
//GET - to read data
app.get('/',(req,res)=>{
    res.status(401).send("It's a get method")
})

//POST-to create data
app.post('/',(req,res)=>{
    res.send("It's a post method")
})


//PuT-to update/modify data
app.put('/',(req,res)=>{
    res.send("It's a put method")
})


//PATCH-to update partially data
app.patch('/',(req,res)=>{
    res.send("It's a patch method")
})


//delete-to delete data
app.delete('/',(req,res)=>{
    res.send("It's a delete method")
})


//reminder app API

// //1)login API
// app.post('/login',(req,res)=>{
//     const result=dataService.login(req.body.userid,req.body.pswd)
//     res.status(result.statusCode).json(result)

// })

// login API after mongo db
app.post('/login',(req,res)=>{
    //asynchronous
    dataService.login(req.body.userid,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})











// //2)register API
// app.post('/register',(req,res)=>{
//     const result=dataService.register(req.body.uname,req.body.userid,req.body.pswd)
//     res.status(result.statusCode).json(result)
// })

//register API (after mongo db)
app.post('/register',(req,res)=>{
    //asynchronous
    //asynchronous cannot be defined into a constant
   dataService.register(req.body.uname,req.body.userid,req.body.pswd)  
.then(result=>{
    res.status(result.statusCode).json(result)
})
    })
    


//addevent
app.post('/addEvent',(req,res)=>{
    dataService.addEvent(req.body.userid,req.body.date,req.body.event)  
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})




//viewWEvent
app.post('/viewEvent',(req,res)=>{
    dataService.viewEvent(req.body.userid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})














//set up the port number
app.listen(3000,()=>{
    console.log("server started at port no: 3000");
})