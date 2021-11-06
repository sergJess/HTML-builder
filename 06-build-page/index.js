const path = require('path');
const fs = require('fs/promises');
const fsFull = require('fs');

async function makeDir(path){
  await fs.mkdir(path, {recursive: true});
  
}
makeDir(path.join(__dirname, 'project-dist'));
createIndexHtml(path.join(__dirname, 'template.html'), path.join(__dirname ,'project-dist'),'index.html', path.join(__dirname, 'components'));
buildBundleCss(path.join(__dirname, 'styles'), path.join(__dirname ,'project-dist'));
copyAssets(path.join(__dirname, 'assets'), path.join(__dirname ,'project-dist'), 'assets');
async function buildBundleCss(inputPath, outputPath){
  const cssFiles = await fs.readdir(inputPath, {withFileTypes: true});
  const writeStream = await fsFull.createWriteStream(path.join(outputPath, 'style.css'));
  for await(const file of cssFiles)
  {
    if(path.extname(file.name) === '.css' && !file.isDirectory()){
      const readStreamFile = await fsFull.createReadStream(path.join( inputPath, `${file.name}`));
      readStreamFile.pipe(writeStream);
    }
     
  }
}

async function createIndexHtml(inputPath, outputPath, fileName, componentsPath){
  const indexHtml = await fsFull.createWriteStream(path.join(outputPath, fileName));
  const readSream = await fsFull.createReadStream(inputPath, 'utf-8');
  const chunks = [];
  for await (const chunk of readSream){
    chunks.push(chunk);
  }
  let templateFile = chunks.join('\n');
  const components = await fs.readdir(componentsPath, {withFileTypes: true});
  for await (let  component of components){
    if(component.isFile() && path.extname(component.name)==='.html'){
      const componentName = component.name.slice(0, component.name.length -path.extname(component.name).length );
      if(templateFile.includes(`{{${componentName}}}`)) {
        const readStreamComponent = await fsFull.createReadStream(path.join(componentsPath, component.name), 'utf8');
        const componentChunks = [];
        for await(let chunk of readStreamComponent){
          componentChunks.push(chunk);
        }
        templateFile = templateFile.replace(`{{${componentName}}}`,`${componentChunks.join('\n')}` );
      }
    }

  }
  indexHtml.write(templateFile);
}

async function copyAssets(inputPath, outputPath, folderName){
  await fs.mkdir(path.join(outputPath, folderName), {recursive: true});
  const files = await fs.readdir(inputPath, {withFileTypes: true});
  for await(let file of files){
    if(file.isDirectory()){
      await fs.mkdir(path.join(outputPath, folderName, file.name), {recursive: true});
    //   const currDirectory = await fs.readdir(path.join(inputPath, file.name), {withFileTypes: true});

    }
    
  }
}
