const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
