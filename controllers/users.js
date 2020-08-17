const usersRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
require('express-async-errors')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})

    res.status(200).json(users) 
})

usersRouter.post('/', async (req, res) => {
    const plen = req.body.password.length

    if (plen < 3){
        res.status(400).json({error: 'password too short'})
    }

    const saltRounds = 15
    const passHash = await bcrypt.hash(req.body.password, saltRounds)

    const user = User({...req.body, password : passHash})
    console.log(user)
    await user.save()

    res.status(201).json(user)

})

module.exports = usersRouter
