const Cache = require('../cache/keyv_singleton')
const { UserRepo } = require("../../database/repository");

const tokenBaseActivation = async (payload) => {

    const { token, userId } = payload;
    
    const user = await  Cache.getTokenData(userId) // await TmpUser.GetById(userId);

    if (!user) {
        return { status: 401, message: "Désolé votre token d'activation a expiré, vous pouvez reprendre le processus de creation de compte. merci.", data: null  }
    }

    if (user && user.token !== token) {
        return { status: 401, message: "Désolé votre token est invalide", data: null }
    }

    try {

        const {__v, otp, createdAt, token, ...rest} = user

        const existingUser = await UserRepo.findOne({email: rest.email});

        if (!existingUser) {
          const newUser = await UserRepo.create({...rest, isActive: true, isVerified: true})
          return { status: 200, message: "Votre compte a été activé avec succès. vous pouvez vous connecter à présent",  data: newUser }
        } else {
          return { status: 200, message: "Le compte utilisateur est déjà existant et activé.",  data: existingUser }
        }
        
    } catch (error) {
        return { status: 401, message: error.message,  data: null }
    }

}  

module.exports = tokenBaseActivation
