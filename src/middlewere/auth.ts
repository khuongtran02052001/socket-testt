import Express from 'express';
const jwt = require('jsonwebtoken')

const verifyToken = (req: Express.Request, res: Express.Response ,next: Express.NextFunction) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token) {
        return res.status(401).json({success: false , message: 'token not found'})
    }
    try {
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN)

        req.userId = decoded.userId

        next()
    } catch (error) {
        
        return res.status(403).json({success: false , message: 'Invalid token'})
    }
}



export default  verifyToken