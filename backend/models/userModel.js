const mongoose = require('mongoose') // MongoDB library
const bcrypt = require('bcrypt') // Encryption - decryption library
// Defining a Model in Mongoose is done through the Schema interface
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

// Sign Up function
userSchema.statics.signup = async function (username, email, password) {

  const userExists = await this.findOne({username}) // Checking for an existing user with mongo's 'findOne()' method
  const emailExists = await this.findOne({email}) // Checking for an existing user with mongo's 'findOne()' method

  if(userExists) {
    throw Error('Username is already in use')
  }

  if(emailExists) {
    throw Error('This email address is already in use')
  }

// Both 'genSalt()' and 'hash()' methods used for hashing (encrypting) the password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt) 

  const user = await this.create({username, email, password: hash})

  return user
}

// Log In function
userSchema.statics.login = async function (username, password) {

  const user = await this.findOne({username}) // Checking for an existing user with mongo's 'findOne()' method

  if(!user) {
    throw Error('Incorrect username')
  }

  const matchInput = await bcrypt.compare(password, user.password)

  if(!matchInput) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)