const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

const scretKey = process.env.SCRET_KEY
const expire = process.env.EXPIRE

let hashPassword = async(password)=>{
let salt = await bycrypt.genSalt(10) 
let hashedPassword = await bycrypt.hash(password,salt)
return hashedPassword
}

let comparePassword = async(password,hashedPassword)=>{

    return bycrypt.compare(password,hashedPassword)
}



const createToken = async({email,role,name,_id})=>{
     let token = await jwt.sign({email,role,name,id:_id
     },scretKey,{expiresIn:expire})
     console.log(token)
return token
}


let decodeToken = async(token)=>{
    return jwt.decode(token)

}

let validate = async(req,res,next)=>{
let token = req?.headers?.authorization?.split(" ")[1]
let {exp} = await decodeToken(token)
if ((Math.round(+new Date/1000))<exp)
{
    next()
}
else{
res.status(401).send({
    message:"Token Expired"
})
}


}

let  adminGuard = async(req,res,next)=>{
    let token = req?.headers?.authorization?.split(" ")[1]
let {role} = await decodeToken(token)
if (role==="admin")
{
    next()
}
else{
res.status(401).send({
    message:"only admin can access"
})
}

}

module.exports={createToken,validate,adminGuard,hashPassword,comparePassword}