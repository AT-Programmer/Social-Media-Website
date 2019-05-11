// Requiring Modules
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const hbs = require('hbs')


// Use Them
var app = express()
var server  = http.createServer(app)
var io = socketIO(server)

app.set('view engine','hbs')

// Code
app.use(express.static('public'))


app.get('/homepage',function(req,res){
     res.render(__dirname + '/public/pages/homepage.hbs', {
       })
})

app.get('/login',function(req,res){
  res.sendFile(__dirname + '/public/login.html')
})

io.on('connection',function(socket){
  console.log('New User Connected To Our Server')
})


app.get('/:param',function(req,res){
  res.send(' Nothing Found Here')
})
// Server Listen

server.listen(5000,(err) => {
  console.log('Server Is Listening At Port No.3000')
})
