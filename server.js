// Requiring Modules
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const hbs = require('hbs')


// Use Them
var app = express()
var server  = http.createServer(app)
var io = socketIO(server)
var {User} = require('./models/mongoose')
var {sgMail} = require('./models/messages')
var id;
// Set Viewengine
app.set('view engine','hbs')

// Requiring Static Files
app.use(express.static('public'))

// Setting Up Homepage url



// Setting Up Login url
app.get('/login',function(req,res){
  res.sendFile(__dirname + '/public/login.html')
})

app.post('/homepage',function(req,res){
  res.render(__dirname + '/pages/homepage.hbs')

    // res.send(id)
})


// Making Connection Between Server And Client
io.on('connection',function(socket){

                                    // For Sign Up
// Check Is All Data right ?
  socket.on('checkData',function(data){
    var user = new User({
      username : data.username,
      email: data.email,
      password: data.password
    })

// Writing Down data

    user.save().then(success => {
        socket.emit('saved',{
          message : 'Account Created Succesfully'
        })
        sgMail.send({
          to: data.email,
          from: 'kakkukmr50@gmail.com',
          subject: `Thanks For Joining Us ${data.username}!`,
          text: `Hello ${data.username} Bro! Thanks For Joining Our Community . I Appreciate You Like Our Website Thank You A Lot`
        })

    },err => {
        socket.emit('showError',{
          err
        })
        console.log(err)
    })

  })


                                //For Sign in

  socket.on('check_email_password',function(data){
      User.find({
        email: data.email,
        password: data.password
      }).then(res => {

        if(res.length == '0'){
          return socket.emit('error_in_sign_in',{
            message: 'Account Not Found'
          })
        }
        id = res[0]._id
        socket.emit('succesfully_sign_in',{
          message: 'Redirecting',
           id
        })

      })
  })

})

// Response To Unkniwn Url
app.get('/:param',function(req,res){
  res.send(' <h1>Nothing Found Here</h1> <a href="localhost:5000">Click to redirect to real website</a>')
})
// Server Listen

server.listen(5000,(err) => {
  console.log('Server Is Listening At Port No.3000')
})
