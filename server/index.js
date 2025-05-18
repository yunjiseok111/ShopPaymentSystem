// 서버 시작코드 정의
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment'); // 라우트와 연결
const productRoutes = require('./routes/products'); // 라우트와 연결
require('dotenv').config(); // 닷엔브 연결

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('');
});

// 라우트 등록
app.use('/api/payment', paymentRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});