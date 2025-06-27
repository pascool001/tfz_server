const { UserRepo } = require("../../database/repository");
const Cache = require("../cache/keyv_singleton")
const { hashedPwd } = require('../../utils')

const ResetPwd = async (payload) => {
    const {userId, token, password} = payload
    // obtention du user conserné
    const User = await UserRepo.findOne({_id: userId}) // conserned user
    if (!User) { // if user not exist
        return { status: 400, message: 'utilisateur inconnu.',  data:  null }
    }
    // recuperation du token ou Otp mise en cache
    const cachedPwdResetToken = await Cache.getTokenData(userId)
    if (!cachedPwdResetToken) {
      return {status: 401, message: (User.userType === "WEB") ? 'Votre Token a expiré' : 'Votre code OTP a expiré' ,  data:  null }
    }
    // Validité du token
    const isValid = (token === cachedPwdResetToken.tokenOrOtp)
    if (!isValid) {
        return {status: 401, message: 'token invalid ou expiré',  data:  null }
    }
    //conservation du nouveau mot de passe haché s'il ne l'est pas déjà
    await Cache.setDataIfNotExist(password, {"passwordHache": (await hashedPwd(password))})
    // recupération du mot de passe haché et comparaison
    const pwdData = await Cache.getTokenData(password)
    // constitution du payload de mise à jour
    const updatePayload = {...User.toJSON(), password : pwdData.passwordHache};
    try {
        const updatedUser = await UserRepo.update(updatePayload, userId);
        return {status: 200, message: "Password Reset Successfully",  data: updatedUser }
    } catch (error) {
        return {status: 401, message: "Password Reset error",  data: error.message }
    }
   

}

module.exports = ResetPwd;