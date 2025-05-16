const rp = require('request-promise');

/**
 * 获取指定URL的内容
 * @param {string} url - 要请求的URL
 * @returns {Promise<object>} 包含状态码、头部和内容的响应对象
 */
async function fetchUrl(url) {
    try {
        if (!url) {
            throw new Error('缺少url参数');
        }

        // 发起GET请求到指定URL
        const result = await rp({
            uri: url,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
            },
  timeout: 10000,
            resolveWithFullResponse: true  // 获取完整的响应对象
        });

        // 返回结果
        return {
            status: result.statusCode,
            headers: result.headers,
            body: result.body
        };
    } catch (error) {
        // 如果出错，抛出错误信息
        throw new Error('获取页面失败: ' + error.message);
    }
}

// 使用示例
async function main() {
    try {
        // 从命令行参数获取URL或使用默认值
        const url = process.argv[2] || 'https://www.baidu.com';
        
        console.log(`正在请求: ${url}`);
        const result = await fetchUrl(url);
        
        console.log('状态码:', result.status);
        console.log('响应头:', result.headers);
        console.log('内容长度:', result.body.length);
        
        // 如果需要查看完整内容，取消下面这行的注释
        // console.log('内容:', result.body);
    } catch (error) {
        console.error('发生错误:', error.message);
    }
}

// 执行主函数
if (require.main === module) {
    main();
}

// 导出函数以便其他模块使用
module.exports = fetchUrl;