const jwt = require('jsonwebtoken');

const {UserRepo} = require("../database/repository");
const {SignIn, RestPwd, RestPwdReq, Register, tokenBaseActivation, TokenRefresh, changePassword} = require('../services')

const register = async (request, response) => {
    const userData = await request.json();
    // const data = await SecurityService.Register(userData);
    const data = await Register(userData);
    return response.json(data)
}

const tokenActivation = async (request, response) => {
    const {token, userId } = await request.json()
    const result = await tokenBaseActivation({token, userId });
    // const result = await SecurityService.tokenBaseActivation({token, userId });
    return response.json(result)
}

const login = async (request, response) => {
    const {email, password} = await request.json();
    const result = await SignIn({email, password});
    // const result = await SecurityService.login({email, password});
    if (result.data) {
        const {accessToken, refreshToken} = result.data;
        return response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' } )
        .header('Authorization', accessToken)
        .status(result.status)
        .json({...result});
    }
    return response.status(result.status).json({...result})
}

const resetPasswordRequest = async (request, response) => {
    const {email} = await request.json();
    const result = await RestPwdReq(email);
    return response.json({...result});
}


const resetPassword = async (request, response) => {
    const {userId, token, password} = await request.json();
    const result = await RestPwd({userId, token, password});
    return response.status(result.status).json({...result});
}


const refreshtoken = async (request, response) => {
    const refreshToken = request.cookies['refreshToken'];
    const result = await TokenRefresh(refreshToken) 
    return response.status(result.status).header('Authorization', result.data).json({accessToken: result.data})
}

const logout = async (request, response) => {
    const SECRET = 'qqefkuhio3k2rjkofn2mbikbkwjhnkk'
    const accessToken = jwt.sign({userId: request.user}, SECRET, {expiresIn: 1});
    const refreshToken = jwt.sign({userId: request.user}, SECRET, {expiresIn: 1});
    return response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    .header('Authorization', "")
    .json({message: 'vous êtes déconnectés', data: {accessToken, refreshToken} });
}

const getMe = async (request, response) => {
    try {
        const user = await UserRepo.findOne({_id: request.user})
        
        if(!user){
            return response.status(404).json({message: 'Utilisateur inconnu'});
        }
        const {__v, is_active, is_verified, is_admin, createdAt, updatedAt, password, ...rest} = user.toJSON()

        response.status(200).json(rest);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const changePwd = async (request, response) => {
    const accessToken = request.headers['authorization'];
    const {oldPassword, newPassword} = await request.json();
    if (!oldPassword) {  return response.status(400).json({error: 'Invalid old password.'}) }
    if (!newPassword) {  return response.status(400).json({error: 'Invalid new password.'}) }
    if (!accessToken) { return response.status(400).json({error: 'token is not defined'})  }
    const result = await changePassword({oldPassword, newPassword, accessToken});
    return response.status(result.status).json({message: result.message, data: result.data})
}

module.exports = {
    changePwd,
    getMe,
    logout,
    login,
    register, 
    tokenActivation, 
    resetPasswordRequest, 
    refreshtoken, 
    resetPassword
}

