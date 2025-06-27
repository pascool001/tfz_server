
module.exports = {
    Cache: require('./cache/keyv_singleton'),
    sendEmail: require('./Senders/email_sender'),
    smsService: require('./Senders/sms_sender'),
    RestPwdReq: require('./security/resetPwdReq.service'),
    RestPwd: require('./security/resetPwd.service'),
    Register: require('./security/register.service'),
    tokenBaseActivation: require('./security/tokenBaseActivation.service'),
    SignIn: require('./security/login.service'),
    TokenRefresh: require('./security/tokenRefresh.service'),
    changePassword: require('./security/changePassword.service'),
}