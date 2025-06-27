const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { UserRepo} = require("../../database/repository");

const changePassword = async (payload) => {

      const secretKey = process.env.JWT_SECRET;

      const {oldPassword, newPassword, accessToken} = payload;

      console.log("changePassword payload : ", payload, "  secretKey :", secretKey)

      let decoded;

      try {
        decoded = jwt.verify(accessToken, secretKey);
      } catch (error) {
          return {status: 400, message: 'token invalide', data: null }
      } 
      
      const {userId} = decoded;
      const user = await UserRepo.findOne({_id :userId})
      if (!user) {
        return { status: 401, message: "Compte utilisateur introuvable ", data:null }
      }
      //check if password matches
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) { 
          return { status: 401, message: "Ancien mot de pase invalide", data: null } 
      }
  
      try {
        const newPassword_crypte = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_SALT));
        await UserRepo.update({password: newPassword_crypte}, user.id)
        return {status: 200, message: 'Password modifié avec success !', data: null }
      } catch (error) {
        return {status: 500, message: `Server error : ${error.message}`, data: null }
      }
  
}

module.exports = changePassword
