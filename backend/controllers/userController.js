const User = require("../models/userModel");

const signupUser = async (req, res) => {

    const {username, password} = req.body

    try {
        const user = await User.signup(username, password)
        res.status(200).json({username, password})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {signupUser}