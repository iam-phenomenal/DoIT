const emailVerification = new Promise((resolve, reject)=>{
    //signToken
    const token = resolve(signToken())
}).then(
    console.log(sendMail(token))
).catch(err)(
    console.error(err.message)
)

console.log(emailVerification)


//test promise
function signToken(user){
    return "token signed"
}

function sendMail(mail){
    return "mail sent"
}

function throwError(err){
    return result
}

console.log(emailVerification())