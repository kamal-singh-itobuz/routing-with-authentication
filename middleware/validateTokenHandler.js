import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        //now we got the token, and its time to verigy it
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error('User is not Authorized');
            }
            //token is verified and extracted or decoded the user info
            //now embed the user info to req
            req.user = decoded.user;
            next();
        });
    }
    if(!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

export default validateToken;