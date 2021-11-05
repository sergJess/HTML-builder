const path = require('path');
const fs = require('fs');
const process = require('process');
const stdinProcess = process.stdin;
const stdoutProcess = process.stdout;
const readline = require('readline');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf8');
const rl = readline.createInterface(stdinProcess, stdoutProcess);
console.log('Greeting!');
rl.on('line', (input) => {
  if(input === 'exit')
  {
    console.log('Goodbye');
    rl.close();
  }
  else
  {
    output.write(`${input}\n`);
  }
 
});
rl.on('SIGINT',()=>{
  console.log('Goodbye...');
  rl.close();
});

