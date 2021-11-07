const path = require('path');
const fs = require('fs');
const process = require('process');
const stdinProcess = process.stdin;
const stdoutProcess = process.stdout;
const readline = require('readline');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf8');
const rl = readline.createInterface(stdinProcess, stdoutProcess);
console.log('Greeting! Press something in console');
rl.on('line', (input) => {
  if(input === 'exit')
  {
    console.log('Goodbye... friend, this is suicide season in the hospital for souls');
    rl.close();
  }
  else
  {
    output.write(`${input}\n`);
  }
 
});
rl.on('SIGINT',()=>{
  console.log('Goodbye... friend, this is suicide season in the hospital for souls');
  rl.close();
});

// Прощальная фраза в файл не пишется