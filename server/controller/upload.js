const path = require('path')

module.exports = (req, res) => {
    const urlFiles = []
    for (var key in req.files) {
        req.files[key].mv(path.join('./build', 'images', req.files[key].name))
        urlFiles.push("/images/" + req.files[key].name)
    }
    res.status(200).json(urlFiles)
}