const User = require("../../models/userModel")
const jwtoken = require('jsonwebtoken')

// Create JSON Web Token 
const createJWT = (_id) => {
    return jwtoken.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3600000'})
}

// Sign Up user function
module.exports = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.signup(username, email, password)
        // 'User' model's 'signup' function checks if there is already
        // a user with the same username and email. If not, it returns a new user object.

        const jwt = createJWT(user._id) // Creates a JWT
        res.status(200).json({username, jwt})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
  
