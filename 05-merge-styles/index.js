const path = require('path');
const fs = require('fs/promises');
const fsFull = require('fs');

async function BuildBundleCss(inputPath, outputPath){
  const cssFiles = await fs.readdir(inputPath, {withFileTypes: true});
  const writeStream = fsFull.createWriteStream(path.join(outputPath, 'bundle.css'));
  for await(const file of cssFiles)
  {
    if(path.extname(file.name) === '.css' && !file.isDirectory()){
      const readStreamFile = fsFull.createReadStream(path.join( inputPath, `${file.name}`));
      readStreamFile.pipe(writeStream);
    }
   
  }
}
BuildBundleCss(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist'));