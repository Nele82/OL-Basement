const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authorizeRequest = async (req, res, next) => {
    // Verify user - req.headers.authorization property is commonly used for 
    // handling authentication and authorization. Once authenticated, the server 
    // grants access to the storage data.
    const {authorization} = req.headers

    if (!authorization) { // In this case, there wouldn't be ANY value
        return res.status(401).json({message: 'Authorization token required'})
    } else {
        const token = authorization.split(' ')[1] // Returns JWT
        try {
            const {_id} = jwt.verify(token, process.env.SECRET_KEY)
            // Returns the 'id' of a user if the token checks out
            const user = await User.findById(_id)
            if(user._id.toString() === _id) {
                req.user = await User.findOne({_id}).select('_id')
                // If authentication succeeds, the 'req.user' property is set to the authenticated user. 
                // You can access 'req.user' in all routes where the authorization middleware is invoked.
                next()
            }
        } catch (error) {
            res.status(401).json({message: `${error.message} - We encountered an error while attempting 
            to access your storage facility details. Please log out and try logging in again. If the 
            issue persists, kindly contact the developer via the 'Contact' page form.`})
        }
    }
}

module.exports = authorizeRequest