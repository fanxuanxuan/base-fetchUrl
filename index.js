const express = require('express');
const rp = require('request-promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // 使用cors中间件

// 添加根路径路由
app.get('/', (req, res) => {
  res.send('Proxy Server is Running');
});

app.get('/fetch-url', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) throw new Error('Missing URL parameter');
        
        const result = await rp({
            uri: url,
            method: 'GET',
            headers: { 'User-Agent': 'Node.js Request Tool' },
            resolveWithFullResponse: true
        });
        
        res.json({
            status: result.statusCode,
            headers: result.headers,
            body: result.body
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});