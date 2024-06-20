const User = require("../models/userModel")
const jwtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt') 
const Mailjet = require ('node-mailjet')
// Development & production http front-end server addresses
const devFront = 'http://localhost:3000'
const deployFront = 'https://ol-basement.netlify.app'

// Create JSON Web Token 
const createJWT = (_id) => {
    return jwtoken.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3600000'})
}
// Sign Up user function
const signupUser = async (req, res) => {

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
// Reset request function
const requestReset = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({message: 'User was not found'})
    }
  
    const token = jwtoken.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '600000' })

    const resetLink = `${devFront}/password-reset?token=${token}`
  
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE
    )
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "ol.basement@gmail.com",
                Name: "OL Basement"
              },
              To: [
                {
                  Email: `${user.email}`,
                  Name: `${user.username}`
                }
              ],
              Subject: `Password reset for ${user.username}`,
              HTMLPart: `<h3>Dear ${user.username},</h3><br /><p>We’ve received a request to reset your password. If you did not make this 
              request, please ignore this email.<br />To set up a new password, please click on the link below:<br />
              <a href=\"${resetLink}\">Reset Your Password</a><br />This link will take you to a password-reset page where you can enter and confirm 
              your new password.<p/><p><b>NOTE:</b> The password reset link is valid for <b>10 minutes only</b> from the moment you requested to reset the password
              at "Password Reset Request Form" page.<br />If you do not reset your password within this time frame, you will need to submit a new request.</p>
              Thank you for using our services!<br /><br />
              Warm regards,<br />OL Basement Team`
            }
          ]
        })

request
    .then((result) => {
        res.status(200).json({data: result.body})
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
}
// Password reset function
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    const decoded = jwtoken.verify(token, process.env.SECRET_KEY)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await User.updateOne({ _id: decoded.id }, { password: hashedPassword })
    res.status(200).json({message: 'Password reset successfully.'})
  } catch (error) {
    res.status(500).json({message: 'Error resetting password.'})
  }
}

module.exports = {
    signupUser, 
    loginUser,
    requestReset,
    resetPassword
}