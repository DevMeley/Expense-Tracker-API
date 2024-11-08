const Notification = require('../../models/notification')
const User = require('../../models/user')

// @desc get notifications
// @route GET noitication
// @access private
const getNotificationHandler = async (req ,res) => {
    try {
        const user = req.user
        const notification = await Notification.findAll({
            where:{
                UserId: user.id
            },
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json(notification)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {getNotificationHandler}