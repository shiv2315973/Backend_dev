const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const words = data.trim().split(/\s+/);
    const wordCount = words.length;

    const output = `Word Count: ${wordCount}`;

    fs.writeFile('output.txt', output, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Word count written to output.txt');
    });
});