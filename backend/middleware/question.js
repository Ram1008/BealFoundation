import jwt from 'jsonwebtoken';
const JWT_secret = 'i$m$ram$cool';

export const checkAdminToken =(req,res,next)=>{

    const token = req.header('authToken')||req.cookies.token;
    if(!token){
        res.status(401).send({error: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, JWT_secret);
        if (!decoded.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).send({error: 'Unauthorized'});

    }
   
}
export const checkToken =(req,res,next)=>{

    const token = req.header('authToken')||req.cookies.token;
    if(!token){
        res.status(401).send({error: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, JWT_secret);
        if (!decoded) {
            return res.status(403).json({ error: 'Logged Out' });
        }
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).send({error: 'Logged Out'});

    }
   
}


