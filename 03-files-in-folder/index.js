const path = require('path');
const fs = require('fs/promises');

async function showFiles(path){
  const bytesInKilobytes = 1024;
  const pathWay = require('path');
  const wayPath = path;
  const files = await fs.readdir(path, {withFileTypes: true});
  for (const file of files)
  {
    if(!file.isDirectory()){
      const length = file.name.length;
      let exec = pathWay.extname(file.name).replace('.','');
      let ext = file.name.slice(0, length - exec.length - 1);
      let stat =  fs.stat(pathWay.join(wayPath, `${file.name}`));
      stat.then((dataWeight)=>{
        console.log(`${ext} - ${exec} - ${dataWeight.size / bytesInKilobytes}kb`);
        
      }).catch((err)=>{
        console.log(err);
      });
      
    }
   
  }
  
  
}

showFiles(path.join(__dirname, 'secret-folder'));

