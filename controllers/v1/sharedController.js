//  @desc GET server health check
// @routes GET /health
// @access public

const serverHealthCheck = (req, res) =>{
    res.status(200).json({
        status: 'OK'
    })
}

module.exports = {
    serverHealthCheck,
}