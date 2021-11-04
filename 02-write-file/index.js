const path = require('path');
const fs = require('fs');
const readline = require('readline');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf8');
console.log('Greeting press');
