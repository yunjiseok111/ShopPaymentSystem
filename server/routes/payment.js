const express = require('express');
const router = express.Router();
const { confirmPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware'); // 미들웨어 연걸

// 결제 요청 POST API
router.post('/confirm', verifyToken, confirmPayment); // verifyToken은 JWT검증을 통해 사용자 인증을 위해서 추가됨.
// 즉, 로그인을 통해 검증된 사용자만 결제 요청이 가능해짐.

module.exports = router;