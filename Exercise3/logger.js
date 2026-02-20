const os = require('os');
const fs = require('fs');

function getSystemInfo() {
    const totalMem = os.totalmem() / (1024 ** 3);
    const freeMem = os.freemem() / (1024 ** 3);
    const usedMem = totalMem - freeMem;

    return `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Total Memory: ${totalMem.toFixed(2)} GB
Used Memory: ${usedMem.toFixed(2)} GB
Free Memory: ${freeMem.toFixed(2)} GB
-----------------------------------------
`;
}

setInterval(() => {
    const data = getSystemInfo();
    fs.appendFile('system-log.txt', data, (err) => {
        if (err) {
            console.error("Error writing log:", err);
        } else {
            console.log("System info logged");
        }
    });
}, 5000);