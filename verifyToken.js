import jwt from 'jsonwebtoken';

function auth(req,res,next){
    const token=req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');
    try {
        const verify=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verify;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}

export default auth;