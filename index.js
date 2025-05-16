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
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 10000,
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