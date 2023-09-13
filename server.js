const e = require("express");

const express = require("express");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken")

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

async function authenticateJwtLogin (req, res, next) {
  const adminSecretKey = "S3CR3T"
  console.log("inside middleware:");
  console.log(JSON.stringify(req.headers.username));
  inputObj = {username:req.headers.username, password:req.headers.password}
  if(checkUsernameAvailabilityLogin(inputObj)){
   const values = await jwt.sign(inputObj.username, adminSecretKey, (err, data) => {
      if(err){
        console.error(err)
      }
      console.log(data)
      req.token = data;
    })
    console.log(values)
    next()

  }else{
    res.status(401).send({
      message:"username or password is invalid, please sign up first"
    })
  }
}

 function checkUsernameAvailability(inputUserObj) {
  console.log("inside check method")
  try {
    const data =  fs.readFileSync('./files/Admin.txt', 'utf-8')
    let parsedData = JSON.parse(data);
      let isTaken = false;
      parsedData.forEach((item) => {
        if(inputUserObj.username === item.username){
          isTaken = true;        
        }
      })

      return isTaken;
  } catch (error) {
    console.log('error: '+error)
  }  
}

function checkUsernameAvailabilityLogin(inputUserObj) {
  console.log("inside check method")
  try {
    const data =  fs.readFileSync('./files/Admin.txt', 'utf-8')
    let parsedData = JSON.parse(data);
      let isTaken = false;
      parsedData.forEach((item) => {
        if(inputUserObj.username === item.username && inputUserObj.password === item.password){
          isTaken = true;        
        }
      })

      return isTaken;
  } catch (error) {
    console.log('error: '+error)
  }  
}

function authenticateJwtSignup(req, res, next) {
  const adminSecretKey = "S3CR3T"
  console.log("inside middleware:");
  console.log(JSON.stringify(req.headers));
  let inputObj = {
    username:req.headers.username, password: req.headers.password
  }
  if(checkUsernameAvailability(inputObj)){
    res.status(401).send({
      message:"username is already taken, please try something different"
    })

  }else{
    jwt.sign(inputObj.username, adminSecretKey, (err, data) => {
      console.log(err)
      if(err){
        console.error(err)
      }
      req.token = data;
      console.log(JSON.stringify(req))
    })
    next()
  }
}
// Admin routes
app.post("/admin/signup", authenticateJwtSignup, (req, res) => {
  // logic to sign up admin
  const adminDetailsObj = {username:req.headers.username, password:req.headers.password};
  fs.readFile("./files/Admin.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("some error mate" + err);
      return;
    }

    if (data) {
      let currentData = JSON.parse(data);
      let isTaken = false;
      currentData.forEach((rec) => {
        if (rec.username === adminDetailsObj.username) {
          isTaken = true;
        }
      });
      if(isTaken){
        res.status(401).send("username is already taken");
      }else{
        currentData.push(adminDetailsObj)
        let content = JSON.stringify(currentData);
        fs.writeFile("./files/Admin.txt", content, (err) => {
          if (err) {
            return;
          }
          res.status(200).send({
            message:"Admin created successfully",
            token: req.token
          });
        });
      }
      
    } else {
      const adminList = [];
      adminList.push(adminDetailsObj);
      fs.writeFile("./files/Admin.txt", JSON.stringify(adminList), (err) => {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).send({
          message:"Admin created successfully",
          token:req.token
        })
      });
    }
  });
});

app.post("/admin/login", authenticateJwtLogin, (req, res) => {
  // logic to log in admin
    res.status(200).send({
      message:'Logged in successfully',
      token: req.token
    })
});

app.post("/admin/courses", (req, res) => {
  // logic to create a course
  const userDetails = req.headers;
  console.log(JSON.stringify(userDetails));
  const courseDetails = req.body;
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
});

app.get("/admin/courses", (req, res) => {
  // logic to get all courses
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
});

app.post("/users/login", (req, res) => {
  // logic to log in user
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
