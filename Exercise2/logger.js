const fs = require('fs');

function logMessage(message) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}\n`;

    fs.appendFile('app.log', formattedMessage, (err) => {
        if (err) {
            console.error("Error writing log:", err.message);
            return;
        }
        console.log("Message logged successfully");
    });
}

// Test messages
logMessage("Server started");
logMessage("User logged in");
logMessage("Database connected");