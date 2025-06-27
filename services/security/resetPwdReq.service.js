const { UserRepo } = require("../../database/repository");
const Cache = require("../cache/keyv_singleton")
const { genOtp } = require('../../utils')
const crypto = require("crypto");
const sendEmail = require('../Senders/email_sender')
const smsService = require('../Senders/sms_sender')


const ResetPwdRequest = async (email) => {
    // Extraction du user concerné
    const User = await UserRepo.findOne({email})
    // Vérifions si ce User existe
    if (!User) {
        return {status: 400, message: 'Email ou User inconnu',  data:  null }
    }
    // On va générer un token ou un otp selon le type de User
    let TokenOrOtp = (User.userType === "WEB") ? crypto.randomBytes(32).toString("hex"): (await genOtp());
    // mise en cache du TokenOrOtp
    const CachedData = await Cache.setTokenData(User._id, {"userId": User._id, "tokenOrOtp": TokenOrOtp})
    // payload fro sending reset pwd email
    const emailPayload = {
        name: User.name,
        token:CachedData.tokenOrOtp,
        id: User._id,
        link: `${process.env.CLIENT_DOMAIN}${process.env.RESET_PWD_PATH}?token=${CachedData.tokenOrOtp}&id=${User._id}`
    }
    // payload fro sending reset pwd OTP
    const smsPayload = {
        userid: CachedData.userId, 
        phoneNumber: User.phoneNumber,
        sms_msg: `Ceci est votre code otp d\'activation: ${CachedData.TokenOrOtp} `
    }
    const emailOrSmsResult = (User.userType === "WEB") ?
    (await sendEmail(
        User.email, 
        "Réinitialisation du mot de passe", 
        emailPayload, "./template/requestResetPassword.handlebars",
        `Un lien de re-initialisation de mot de passe a été envoyé à l'addresse: ${email} `
    )) :  (await smsService(smsPayload))
    // console.log("send email back data: ", emailOrSmsResult)
    return emailOrSmsResult;

}


module.exports = ResetPwdRequest;