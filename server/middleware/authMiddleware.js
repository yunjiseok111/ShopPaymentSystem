// 기능별 라우터에 적용시켜 jwt토큰 검증을 위한 미들웨어
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 사용자 JWT토큰 검증 함수
exports.verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')){
        return res.status(401).json({error: '토큰이 없습니다.'});
    }

    const token = auth.split(' ')[1];

    try{
        const decoded = jwt.verity(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(401).json({ error: '토큰이 유효하지 않습니다.'});
    }
};