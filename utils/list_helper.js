const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => { 
    const reducer = (sum, blog) => { 
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => { 
    const maxReducer = (max, blog, index) => { 
        return blogs[max].likes < blog.likes ? index : max
    }
    
    const max_index = blogs.reduce(maxReducer, 0) 
    return blogs[max_index]
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
