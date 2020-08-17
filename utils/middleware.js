const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).send({error: 'username too short'})
    }

    next(error)
}

module.exports = {
    errorHandler
}
