const path = require('path');
const fs = require('fs/promises');

async function showFiles(inputPath){
  const bytesInKilobytes = 1024;
  const pathWay = require('path');
  const files = await fs.readdir(inputPath, {withFileTypes: true});
  for await(const file of files)
  {
    if(!file.isDirectory()){
      const length = file.name.length;
      let exec = path.extname(file.name).replace('.','');
      let ext = file.name.slice(0, length - exec.length - 1);
      let stat =  fs.stat(path.join(inputPath, `${file.name}`));
      stat.then((dataWeight)=>{
        console.log(`${ext} - ${exec} - ${dataWeight.size / bytesInKilobytes}kb`);
        
      }).catch((err)=>{
        console.log(err);
      });
      
    }
   
  }
  
  
}

showFiles(path.join(__dirname, 'secret-folder'));

