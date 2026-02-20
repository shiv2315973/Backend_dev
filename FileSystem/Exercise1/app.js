const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

function readFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err.message);
            return;
        }
        console.log("\nFile Content:\n");
        console.log(data);
    });
}

function writeFile(file, content) {
    fs.writeFile(file, content, 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err.message);
            return;
        }
        console.log("File written successfully");
    });
}

function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) {
            console.error("Error copying file:", err.message);
            return;
        }
        console.log("File copied successfully");
    });
}

function deleteFile(file) {
    fs.unlink(file, (err) => {
        if (err) {
            console.error("Error deleting file:", err.message);
            return;
        }
        console.log("File deleted successfully");
    });
}

function listDirectory(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("Error listing directory:", err.message);
            return;
        }

        console.log("\nDirectory Contents:\n");
        files.forEach(file => {
            console.log(file);
        });
    });
}

switch (command) {
    case "read":
        readFile(args[1]);
        break;

    case "write":
        writeFile(args[1], args[2]);
        break;

    case "copy":
        copyFile(args[1], args[2]);
        break;

    case "delete":
        deleteFile(args[1]);
        break;

    case "list":
        listDirectory(args[1] || ".");
        break;

    default:
        console.log(`
Usage:
  node app.js read <file>
  node app.js write <file> "<content>"
  node app.js copy <source> <destination>
  node app.js delete <file>
  node app.js list <directory>
`);
}