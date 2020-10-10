
const handleError = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError') {
        return res.status(400).send(error.message)
    }
    return res.status(400).send(error.message)
}
module.exports = handleError