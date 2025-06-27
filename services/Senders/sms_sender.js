const smsSender = require('../../utils/sms/sendSMS');

const smsService = async (payload) => {
    const {phoneNumber, sms_msg} = payload
    // const data = await smsSender(phoneNumber, sms_msg)
    // return {status: 200, message: data.message, data: null  }
    return {status: 200, message: data.message, data: {phoneNumber, sms_msg}  }
}

module.exports = smsService