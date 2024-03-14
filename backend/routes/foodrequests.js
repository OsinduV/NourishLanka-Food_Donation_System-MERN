const express = require('express')

const router = express.Router()

//Get all food requests
router.get('/', (req,res) => {
    res.json({mssg:'GET all foodrequests'})
})

//Get a single food request
router.get('/:id', (req,res) => {
    res.json({mssg:'GET a single food request'})
})

//Post a new food request
router.post('/', (req,res) =>{
    res.json({mssg:'POST a new food request'})
})

//Delete  a  food request
router.delete('/:id', (req,res) =>{
    res.json({mssg:'DELETE a food request'})
})

//Update  a  food request
router.patch('/:id', (req,res) =>{
    res.json({mssg:'UPDATE a food request'})
})



module.exports = router