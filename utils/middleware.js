const errorHandler = (error, req, res, next) => {
    console.log(error.message)

//    if (error.name === 'ValidationError') {
 //       return response.status(400).send({ error: error.message })
  //  }

    res.status(400).send({ error: error.message })

    next(error)
}

module.exports = {
    errorHandler
}
