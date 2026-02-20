const fs = require('fs');
const path = require('path');

const sourceDir = './source';
const destinationDir = './destination';

function syncDirectories(src, dest) {
    if (!fs.existsSync(src)) {
        console.error("Source directory does not exist");
        return;
    }

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
        console.log("Destination directory created");
    }

    fs.readdir(src, (err, files) => {
        if (err) {
            console.error("Error reading source:", err.message);
            return;
        }

        files.forEach(file => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            fs.stat(srcPath, (err, stats) => {
                if (err) {
                    console.error("Error checking file:", err.message);
                    return;
                }

                if (stats.isFile()) {
                    if (!fs.existsSync(destPath)) {
                        fs.copyFile(srcPath, destPath, (err) => {
                            if (err) {
                                console.error("Error copying:", err.message);
                                return;
                            }
                            console.log("Copied:", file);
                        });
                    } else {
                        console.log("Skipped (already exists):", file);
                    }
                }
            });
        });
    });
}

syncDirectories(sourceDir, destinationDir);