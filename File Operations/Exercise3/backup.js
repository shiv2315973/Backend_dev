const fs = require('fs');
const path = require('path');

function createBackup(filename) {
    if (!fs.existsSync(filename)) {
        console.error("File does not exist");
        return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);

    const backupName = `${base}-backup-${timestamp}${ext}`;

    fs.copyFile(filename, backupName, (err) => {
        if (err) {
            console.error("Error creating backup:", err.message);
            return;
        }
        console.log("Backup created:", backupName);
    });
}

createBackup("sample.txt");