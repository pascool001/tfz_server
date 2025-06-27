const {UserRepo} = require("../repository");


const { hashedPwd } = require('../../utils')

const GenAdminUser = async () => {

    let existingUser;

    const adminUserData = {
        email: 'pangues001@gmail.com',
        password: await hashedPwd('password001'),
        name: 'Amani pascal',
        isActive: true,
        isVerified: true,
        isAdmin: true,
        phoneNumber: '+2250759803031',
        userType: 'WEB'
    }

    try { 
        existingUser = await UserRepo.findOne({email: adminUserData.email});  
    } catch (error) {}

    if (!existingUser) {
        try {
            await UserRepo.create(adminUserData)
            console.log('Admin user successfully created!')
        } catch (error) {
            console.log('Could not create Admin User.')
        }
    } else {
         console.log('Admin user already exist!')
    }
}

module.exports = GenAdminUser


