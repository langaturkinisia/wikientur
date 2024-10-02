const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const query = event.queryStringParameters.q.toLowerCase();
    const results = [];

    // Read files from the articles directory
    const articlesPath = path.join(__dirname, '../articles');
    const files = fs.readdirSync(articlesPath).filter(file => file.endsWith('.html'));

    // Process each file
    for (const file of files) {
        const content = fs.readFileSync(path.join(articlesPath, file), 'utf8');

        // Check if the query is in the title or the content
        if (content.toLowerCase().includes(query)) {
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : 'Untitled';
            results.push({
                title: title,
                url: `https://turkistanese.github.io/wikientur/articles/${file}`
            });
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
};
