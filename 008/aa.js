const fs = require('fs');
const path = require('path');
let file_path = path.join(__dirname, "/ui.jpg");
let temp;

function fun(){
    fs.readFile(file_path, (err, data) => {
        temp = data.readBigUInt64BE();
        console.log(temp);
        return temp;
    });
}
temp = fun();
console.log(temp);