// const nodemailer = require("nodemailer")

// let testAccount = nodemailer.createTestAccount()
// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 578,
//     secure: false,
//     auth: {
//         user: testAccount.user,
//         pass: testAccount.pass
//     }
// })

// let info = transporter.sendMail({
//     from: '"DoIT"',
// })
// const sendMail = async(email, accessToken)=>{
//     try{
//         const url= `http://localhost:3000/confirmation/${accessToken}`
//         await transporter.sendMail({
//             to: email,
//             subject: "Confirm Email",
//             html: `Please click the link below to <a href="${url}">Confirm Email </a`
//         })
//         return true
//     }catch(err){
//         return false
//     }
// }

// module.exports = sendMail