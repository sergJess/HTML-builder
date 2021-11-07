const path = require('path');
const fs = require('fs/promises');
const fsFull = require('fs');
async function copyDir(){
  try {
    await fs.mkdir(path.join(__dirname, 'copy-files'), {recursive: true});
    const files = await fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true});  
    const copiedFiles = await fs.readdir(path.join(__dirname, 'copy-files'), {withFileTypes: true});
    for await(let file of copiedFiles)
    {
      await fs.unlink(path.join(__dirname, `copy-files/${file.name}`), (err) => {
        if (err) console.log(err);   
      });
    }
        
    for await(const file of files)
    {
      if(!file.isDirectory())
      {
        await fsFull.createWriteStream(path.join(__dirname, `copy-files/${file.name}`));
        await fs.copyFile(path.join(__dirname, `files/${file.name}`), path.join(__dirname, `copy-files/${file.name}`));
      }
    }

  } catch (err) {
    console.error(err);
  }
}
copyDir();