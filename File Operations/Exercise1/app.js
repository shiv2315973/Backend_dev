const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err.message);
        return;
    }

    try {
        const parsedData = JSON.parse(data);

        console.log("Name:", parsedData.name);
        console.log("Course:", parsedData.course);
        console.log("Skills:", parsedData.skills.join(", "));
        console.log("Experience:", parsedData.experience, "year(s)");

    } catch (parseError) {
        console.error("Invalid JSON format:", parseError.message);
    }
});