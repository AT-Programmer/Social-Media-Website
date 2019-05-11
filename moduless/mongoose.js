const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Database')

var User = mongoose.model('Users',{
  username: {
    type: String,
    required:true,
    unique: true,
    maxlength: 8,
    minlength: 2
  }
  email : {
    type : String,
    required: true,
    unique: true,
    validate: {
        validator : validator.isEmail,
        message : '{VALUE} is not an email'
      }
  },
  password: {
    type:String,
    required:true,
    minlength:8
  }
})
