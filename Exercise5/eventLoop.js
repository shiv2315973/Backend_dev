const fs = require('fs');

console.log("1: Start");

setTimeout(() => {
    console.log("2: setTimeout 0ms");
}, 0);

setImmediate(() => {
    console.log("3: setImmediate");
});

process.nextTick(() => {
    console.log("4: nextTick");
});

Promise.resolve().then(() => {
    console.log("5: Promise");
});

fs.readFile(__filename, () => {
    console.log("6: File I/O");

    setTimeout(() => {
        console.log("7: setTimeout inside I/O");
    }, 0);

    setImmediate(() => {
        console.log("8: setImmediate inside I/O");
    });

    process.nextTick(() => {
        console.log("9: nextTick inside I/O");
    });
});

console.log("10: End");