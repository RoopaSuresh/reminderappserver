//import jsonwebtoken
const jwt = require('jsonwebtoken')


//import Reminder
const db = require('./db')



database = {
  1000: { userid: 1000, uname: "Zoya", password: 1000, event: [] },
  1001: { userid: 1001, uname: "Lisa", password: 1001, event: [] },
  1002: { userid: 1002, uname: "Jay", password: 1002, event: [] }
}


// //login
// //login after local storage
// const login = (userid, pswd) => {

//     if (userid in database) {
//         if (pswd == database[userid]["password"]) {
//             currentId = userid
//             // this.currentUname=database[userid].uname
//             //   this.storeData()
//             //   return true
//             return {
//                 statusCode: 200,
//                 status: true,
//                 message: "Successfully logged in",
//                 currentId,
//             }

//         }
//         else {
//             // alert("incorrect password")
//             // return false
//             return {
//                 statusCode: 422,
//                 status: false,
//                 message: "Incorrect password"

//             }

//         }
//     }
//     else {
//         //   alert("user does not exist")
//         //   return false
//         return {
//             statusCode: 422,
//             status: false,
//             message: "User does not exist"

//         }

//     }
// }



//login after mongo db
const login = (userid, pswd) => {
  //asynchronous
  return db.Reminder.findOne({ userid, pswd })
    .then(user => {
      if (user) {
        currentId = userid
        //storing uname into a variable
        //   currentUname = user.uname

        //   //token generation
        //   const token = jwt.sign({
        //     currentAcno: acno
        //   }, 'supersecretkey123')

        return {
          statusCode: 200,
          status: true,
          message: "Successfully logged in",
          currentId
          // currentUname
          // token
        }
      }
      else {
        // return false
        return {
          statusCode: 422,
          status: false,
          message: "Incorrect userid/password"

        }
      }

    })

}















// //register
// const register=(uname,userid,pswd)=>{
//     if(userid in database){
//     //   return false
//     return {
//         statusCode: 422,
//         status: false,
//         message: "User already exist please login"

//     }

//     }
//     else{
//       database[userid]={
//         userid,
//         uname,
//         password:pswd,
//         event:[]
//       }
//       console.log(database);
//     //   return true
//     return {
//         statusCode: 200,
//         status: true,
//         message: "Successfully logged in",
//     }

//     }
//   }

//register using mongodb
const register = (uname, userid, pswd) => {

  //asynchronous
  return db.Reminder.findOne({
    //key:value key should be the one defined in model and value should be the one which is inside register function bracket
    //since key and value are same just type it once
    uname
  })
    .then(user => {
      console.log(user);
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "User already exist please login"
        }
      }
      else {
        const newReminder = new db.Reminder({
          //since key and value are same just acno is enough
          userid,
          uname,
          pswd,
          event: []
        })
        newReminder.save()
        return {
          statusCode: 200,
          status: true,
          message: "Successfully registered"

        }
      }
    })

}



//addevent
const addEvent = (userid, date, event) => {
  return db.Reminder.findOne({
    userid
  })
    .then(user => {
      // console.log(user);
      if (user) {
        user.event.push({
          date, event
        })
        user.save()
        return {
          statusCode: 200,
          status: true,
          message: "reminder Successfully added"
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorrect password/account number"

        }
      }
    })


}



//viewEvent
const viewEvent=(userid)=>{
return db.Reminder.findOne({userid})
.then(user=>{
  if(user){
    return{
      statusCode:200,
      status:true,
      event:user.event
    }
  }
  else{
    return{
      statusCode:422,
      status:false,
      message:"User does not exist"
    }
  }
})
}


















//export
module.exports = {
  login,
  register,
  addEvent,
  viewEvent
}