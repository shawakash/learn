const fs = require("fs");

const callback = (err, data) => {
    if(!err) {
        console.log(data);
    }
}

fs.readFile("a.txt", "utf-8", callback);

fs.readFile("a.txt", "utf-8", function(err, data) {
    if(!err) {
        console.log(data);
    }
})

fs.readFile("a.txt", "utf-8", (err, data) => {
    if(!err) {
        console.log(data);
    }
});

// Random comment