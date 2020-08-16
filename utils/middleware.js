const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    return res.status(400).send({ error: error.message })

    next(error)
}

module.exports = {
    errorHandler
}
