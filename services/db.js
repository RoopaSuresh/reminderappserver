//import mongoose
const mongoose=require('mongoose')

//state connection string
mongoose.connect('mongodb://localhost:27017/reminderapp',{
    useNewUrlParser:true
})

//model creation- model's name should be in singular and initial letter should be in capital letter
const Reminder=mongoose.model('Reminder',{
    userid: Number,
     uname: String,
      pswd: String,
        event: []
})


//export model ie User
module.exports={
    Reminder
}
