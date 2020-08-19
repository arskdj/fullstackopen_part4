const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
require('express-async-errors')

loginRouter.post('/', async (req,res) => {
    const user = await User.findOne({ username : req.body.username })

    if (!user){
        return res.status(404).json({
            error : 'user not found'
        })
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password)


    if (!correctPassword){
        return res.status(400).json({
            error : 'wrong password'
        })
    }


    const payload = {
        username : user.username,
        id : user.id
    }

    const token = await jwt.sign(payload, config.SECRET)

    res.status(200).json({ token: token,  username : user.username, name: user.name })

})

module.exports = loginRouter
