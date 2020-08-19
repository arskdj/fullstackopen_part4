const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String , required : true}, 
    author: String,
    url: { type : String, required : true},
    likes: { type : Number, default: 0 },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        if (returnedObject.user)
            returnedObject.user = returnedObject.user.toString()
        else
            delete returnedObject.user

        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
