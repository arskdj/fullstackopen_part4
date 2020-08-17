const usersRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})

    res.status(200).json(users) 
})

usersRouter.post('/', async (req, res) => {

    const saltRounds = 15
    const passHash = await bcrypt.hash(req.body.password, saltRounds)

    const user = User({...req.body, password : passHash})
    await user.save()

    res.status(200).json(user)

})

module.exports = usersRouter
