const jwt = require('jsonwebtoken');
const JWT_SECRET = "db@iNoteBook"

const fetchuser =(req,res,next)=>{
    //Get user from the jwt token and add ID to request obj
    const authToken = req.header('auth-token');
    
    if(!authToken){
        res.status(401).send({error:'Please authenticate using a valid token'})
    }
    try{
    const data = jwt.verify(authToken,JWT_SECRET);
    req.user = data.user;
    next()
    }catch(error){
        res.status(401).send({error:'Please authenticate using a valid token'})
    }
}

module.exports = fetchuser