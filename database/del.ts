import fs from 'fs';
import path from 'path';

let database = path.resolve('./database');
let docker = path.resolve('./database/docker');
let data = path.resolve('./database/docker/data');
let logs = path.resolve('./database/docker/logs');

let deleteFolderRecursive = function(folder_path: string) {
  console.log('delete  to ', folder_path);
  if (fs.existsSync(folder_path)) {
    fs.readdirSync(folder_path).forEach(function(file, index) {
      var curPath = folder_path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folder_path);
  }
};

function rebuildFolder(folder_path: string) {
  if (!fs.existsSync(folder_path)) {
    let rebuild = path.resolve(folder_path);
    fs.mkdirSync(rebuild, 0o744);
  }
}

// フォルダを削除
if (fs.existsSync(data)) {
  deleteFolderRecursive(data);
}
if (fs.existsSync(logs)) {
  deleteFolderRecursive(logs);
}

// リビルド
rebuildFolder(database);
rebuildFolder(docker);
rebuildFolder(data);
rebuildFolder(logs);

console.log('done');
