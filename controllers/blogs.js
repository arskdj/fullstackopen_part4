const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
    const result = await Blog .find({})
    res.json(result)
})

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)


    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await Blog.findByIdAndDelete(id)
    if (result)
        res.status(200).json(result)
    else
        res.status(404).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const newBlog = req.body
    const opts = {
        new : true, 
        runValidators : true,
        context: 'query'
    }

    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, opts)
    res.status(200).json(result)
})

module.exports = blogsRouter
