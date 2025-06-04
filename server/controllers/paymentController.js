const axios = require('axios');
require('dotenv').config();

// 결제 요청 처리 함수
exports.confirmPayment = async (req, res) => {
    const{ paymentKey, orderId, amount } = req.body;

    try{
        const response = await axios.post(
            'https://api.tosspayments.com/v1/payments/confirm',
            { paymentKey, orderId, amount },
            {
                headers: {
                    Authorization: 'Basic ' + Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64'),
                    'Content-Type': 'application/json',
                },
            }
        );
        res.status(200).json(response.data);
    } catch(error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
};