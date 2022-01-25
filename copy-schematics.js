const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const SCHEMATICS_SRC = './schematics/src';
const SCHEMATICS_DEST = './dist/schematics';

const readFolder = (source) => {
  const paths = []
  const dirContent = fs.readdirSync(source, {withFileTypes: true});
  for(const file of dirContent){
    if(file.isDirectory()){
      paths.push(...readFolder(path.join(source, file.name)));
    }else{
      paths.push({path: path.join(source, file.name), dirent: file});
    }
  }

  return paths.sort((a, b) => a.path.split(new RegExp(/[\\\/]/, "gm")).length - b.path.split(new RegExp(/[\\\/]/, "gm")).length);
}

const copySchematics = () => {
  const paths = readFolder(SCHEMATICS_SRC);
  for(const target of paths){
    const parsed = path.parse(target.path);
    const targetLocation = path.join(SCHEMATICS_DEST, path.relative(SCHEMATICS_SRC, target.path));
    if(parsed.ext == ('.json') || parsed.dir.includes('templates')){
      fse.ensureDirSync(path.parse(targetLocation).dir);
      try {
        fs.copyFileSync(target.path, targetLocation);
      } catch (error) {
        console.warn(error);
      }
    }
  }
}

copySchematics();
