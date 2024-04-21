const User = require("../models/userModel")
const jwtoken = require('jsonwebtoken')

// Create JSON Web Token 
const createJWT = (_id) => {
    return jwtoken.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3600000'})
}
// Sign Up user function
const signupUser = async (req, res) => {

    const {username, password} = req.body

    try {
        const user = await User.signup(username, password)
        // 'User' model's 'signup' function checks if there is already
        // a user with the same username. If not, it returns a new user object.

        const jwt = createJWT(user._id) // Creates a JWT
        res.status(200).json({username, jwt})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// Log In user function
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        // The User.login function from the 'userModel.js' module compares 
        // existing password hash against the one entered by the user.
        // Only then it returns the user object and below code proceeds.
        const user = await User.login(username, password)

        const jwt = createJWT(user._id) // Creates a JWT
        res.status(200).json({username, jwt})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {signupUser, loginUser}