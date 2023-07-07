import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(403).send( "Access denied")
        
        token = token.split(' ')[1]
        if (!token) return res.status(401).send("Unauthoried request")
    
        let verifiedUser = jwt.verify(token, process.env.jwtSecret)
        if (!verifiedUser) return res.status(401).send("Unauthorized request");
    
        req.user = verifiedUser;
        // console.log(verifiedUser)
        next();   
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}