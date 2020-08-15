const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config.js')
const blogsRouter = require('./controllers/blogs.js')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
