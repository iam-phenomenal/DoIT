const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
})

const sendMail = async(email, accessToken)=>{
    try{
        const url= `http://localhost:3000/confirmation/${accessToken}`
        await transporter.sendMail({
            to: email,
            subject: "Confirm Email",
            html: `Please click the link below to <a href="${url}">Confirm Email </a`
        })
        return true
    }catch(err){
        return false
    }
}

module.exports = sendMail