const path = require('path');
const fs = require('fs/promises');
const fsFull = require('fs');

async function makeDir(path){
  await fs.mkdir(path, {recursive: true});
}

makeDir(path.join(__dirname, 'project-dist'));
clean(path.join(__dirname, 'project-dist','assets'), {recursive : true});
createAssets(path.join(__dirname, 'assets'), path.join(__dirname ,'project-dist','assets'));
// createIndexHtml(path.join(__dirname, 'template.html'), path.join(__dirname ,'project-dist'),'index.html', path.join(__dirname, 'components'));
// buildBundleCss(path.join(__dirname, 'styles'), path.join(__dirname ,'project-dist'));

// copyAssets(path.join(__dirname, 'assets'), path.join(__dirname ,'project-dist'), 'assets');


// async function buildBundleCss(inputPath, outputPath){
//   const cssFiles = await fs.readdir(inputPath, {withFileTypes: true});
//   const writeStream = await fsFull.createWriteStream(path.join(outputPath, 'style.css'));
//   for await(const file of cssFiles)
//   {
//     if(path.extname(file.name) === '.css' && !file.isDirectory()){
//       const readStreamFile = await fsFull.createReadStream(path.join( inputPath, `${file.name}`));
//       readStreamFile.pipe(writeStream);
//     }
     
//   }
// }

// async function createIndexHtml(inputPath, outputPath, fileName, componentsPath){
//   const indexHtml = await fsFull.createWriteStream(path.join(outputPath, fileName));
//   const readSream = await fsFull.createReadStream(inputPath, 'utf-8');
//   const chunks = [];
//   for await (const chunk of readSream){
//     chunks.push(chunk);
//   }
//   let templateFile = chunks.join('\n');
//   const components = await fs.readdir(componentsPath, {withFileTypes: true});
//   for await (let  component of components){
//     if(component.isFile() && path.extname(component.name)==='.html'){
//       const componentName = component.name.slice(0, component.name.length -path.extname(component.name).length );
//       if(templateFile.includes(`{{${componentName}}}`)) {
//         const readStreamComponent = await fsFull.createReadStream(path.join(componentsPath, component.name), 'utf8');
//         const componentChunks = [];
//         for await(let chunk of readStreamComponent){
//           componentChunks.push(chunk);
//         }
//         templateFile = replaceContent(templateFile, componentChunks.join('\n'), `{{${componentName}}}`);
//       }
//     }

//   }
//   indexHtml.write(templateFile);
// }

// function replaceContent(template, change, splitter ){
//   let tempTemplate = template;
//   if(typeof change === 'string' && typeof splitter === 'string' && typeof template === 'string'){
//     tempTemplate = tempTemplate.split(splitter).join(change);
//     return tempTemplate;
//   }
//   return template;
// }
async function createAssets(inputPath, outputPath){
  const folder = await fs.readdir(inputPath, {withFileTypes: true});
  for await (let file of folder) {
    if(file.isDirectory()){
      await fs.mkdir(path.join(outputPath, file.name), {recursive: true});
      createAssets(path.join(inputPath, file.name), path.join(outputPath, file.name));
    }
    if(file.isFile()){
      const readFileStream = await fsFull.createReadStream(path.join(inputPath, file.name),'utf8');
      const writeFileStream = await fsFull.createWriteStream(path.join(outputPath, file.name),'utf8');
      readFileStream.pipe(writeFileStream);
      
    }
  }
}


async function clean(inputPath){
  const folder = await fs.readdir(inputPath, {withFileTypes: true});
  for await (let file of folder) {
    if(file.isDirectory()){ 
      clean(path.join(inputPath, file.name));
    }
    if(file.isFile()){
      fs.rm(path.join(inputPath, file.name));
      
    }
  }
  
}

