const fs = require('fs');
const readline = require('readline');

const filePath = 'server.log';

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const readStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    totalLines++;

    if (line.includes("ERROR")) {
        errorCount++;
    } else if (line.includes("WARNING")) {
        warningCount++;
    } else if (line.includes("INFO")) {
        infoCount++;
    }
});

rl.on('close', () => {
    console.log("\n===== Log Analysis Report =====");
    console.log("Total Lines:", totalLines);
    console.log("INFO Count:", infoCount);
    console.log("WARNING Count:", warningCount);
    console.log("ERROR Count:", errorCount);
});