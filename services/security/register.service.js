
const { UserRepo } = require("../../database/repository");
const sendEmail = require('../Senders/email_sender')
const smsService = require('../Senders/sms_sender')
const Cache = require('../cache/keyv_singleton')
const { hashedPwd, genToken, genOtp } = require('../../utils')


const Register = async (userData) => {
    
    const {email} = userData;

    const existingUser = await UserRepo.findOne({email});

    if (existingUser) {
      return { status: 422, message: `Ce compte est déjà existant et actif`,  data:null } 
    }
  
    const existingTmpUser = await Cache.getTokenData(email)

    if (existingTmpUser) {
      return {
        status: 422, 
        message: `Un processus de creation de compte est déjà en cours pour cet eMail ${email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
        data: null
       }
    }
  
    try {
        const ToCache = {...userData, id: crypto.randomUUID(), password: (await hashedPwd(userData.password)) , token: await genToken(), otp: await genOtp()}
        const User = await  Cache.setTokenData(
            ToCache.id, 
            ToCache
        )
        
        const emailPayload = {
        name: User.name, 
        otp: User.otp, 
        link: `${process.env.CLIENT_DOMAIN}${process.env.ACTIVATION_PATH}?token=${User.token}&id=${User.id}`
        }
        const smsPayload = {
            userid: User.id, 
            phoneNumber: User.phoneNumber, 
            sms_msg: `Ceci est votre code otp d\'activation: ${User.otp} `
        }
        const emailOrSmsResult = (ToCache.userType === "WEB") ?
        (await sendEmail(
            User.email, 
            "Réinitialisation du mot de passe", 
            emailPayload,
            "./template/requestResetPassword.handlebars",
            `Un lien de re-initialisation de mot de passe a été envoyé à l'addresse: ${User.email} `
        )) :  (await smsService(smsPayload))
        return emailOrSmsResult;
    } catch (error) {
      return {status: 422, message: error.message,  data:  null }
    }

}

module.exports = Register;
