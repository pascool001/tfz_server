const mailSender = require('../../utils/email/sendEmail');

const sendEmail = async (email, subject, payload, template, backMsg)  => {
    try {
        await mailSender(email, subject, { ...payload }, template);
        // return { status: 200, message: backMsg,  data: null }
        return { status: 200, message: backMsg,  data: payload }
    } catch (error) {
        return { status: 401, massage: error.message,  data: null }
    }
}

module.exports = sendEmail;