const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const articlesPath = path.join(__dirname, '../articles');
    const files = fs.readdirSync(articlesPath).filter(file => file.endsWith('.html'));

    return {
        statusCode: 200,
        body: JSON.stringify({ count: files.length }),
    };
};
    