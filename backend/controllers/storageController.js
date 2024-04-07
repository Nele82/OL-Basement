// MongoDB - model & library
const Facility = require('../models/storageModel') 
const mongoose = require('mongoose')

// Create a new storage
const createStorage = async (req, res) => {
    const {
        facilityName, 
        length, 
        width, 
        height, 
        userId, 
        facilityId
    } = req.body

    let blanks = []

    if(!facilityName) {
        blanks.push('Test 1')
    }
    if(!length) {
        blanks.push('Test 2')
    }
    if(!width) {
        blanks.push('Test 3')
    }
    if(!height) {
        blanks.push('Test 4')
    }
    if(!userId) {
        blanks.push('Test 5')
    }
    if(!facilityId) {
        blanks.push('Test 6')
    }
    if(blanks.length > 0) {
        res.status(400).json({message: 'Please fill in all the required fields:', blanks})
    }
    
    
}