const config = require('../utils/config.js')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.DB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = Blog
