const path = require('path');
const fs = require('fs');

const readStreamFile = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
readStreamFile.on('data', (data)=>{
  console.log(data);
}
 
);