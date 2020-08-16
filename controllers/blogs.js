const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch( error => {
            response.status(400).json({error: error.message})
        })
})

blogsRouter.delete('/:id', (request, response) => {
    const id = request.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            if (result)
                response.status(200).json(result)
            else
                response.status(404).end()
        }).catch( error => {
            console.log(error)
            response.status(400).json({error: error.message})
        })
})
module.exports = blogsRouter
