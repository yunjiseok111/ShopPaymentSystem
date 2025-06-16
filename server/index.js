// 서버 시작코드 정의
const express = require('express'); // node의 express 사용
const cors = require('cors');
const paymentRoutes = require('./routes/payment'); // payment 라우트와 연결
const productRoutes = require('./routes/products'); // products 라우트와 연결
const userRoutes = require('./routes/users'); // users 라우트와 연결
require('dotenv').config(); // 닷엔브 연결

const app = express();
const PORT = 4000; // 서버 포트 4000 설정

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('');
});

// 라우트 등록
app.use('/api/payment', require('./routes/payment'));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});