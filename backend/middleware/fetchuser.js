const jwt = require("jsonwebtoken")
const JWT_SECRECT ="ali$goodboy"


const fetchuser =(req,res,next)=>{

    const token = req.header("token")
    
    if(!token){
        res.status(401).send({error:"pls authenticate useing a valid token"})
    }
    try {
        const data= jwt.verify(token,JWT_SECRECT);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"pls authenticate useing a valid token"})
    }
}

module.exports = fetchuser