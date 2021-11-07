const path = require('path');
const fs = require('fs');

// the same solution

// const readStreamFile =  fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
// readStreamFile.on('data', (data)=>{
//   console.log(data);
// });



async function ReadFileN(path){
  const  readStreamFile = await fs.createReadStream(path);
  const chunks = [];
  for await (const chunk of readStreamFile) {
    chunks.push(chunk);
  }
  return chunks.join('\n');
}

ReadFileN(path.join(__dirname, 'text.txt'), 'utf8').then((data)=>{
  console.log(data);
}, ()=>{
  console.log('Error');
});