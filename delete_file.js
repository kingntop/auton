const disk = require('diskusage');
const os = require('os');

let path = '/logs/public';


// Promise
async function getFreeSpace(path) {
  try {
    const { free, total} = await disk.check(path);
    console.log(`Free space: ${free/total}`);
    return free/total
  } catch (err) {
    console.error(err)
    return 0
  }
}


 getFreeSpace(path)

 const { readdir } = require('fs').promises;

 const getFileList = async (path) => {
     let files = [];
     const items = await readdir(path, { withFileTypes: true });
 
     for (const item of items) {
         if (item.isDirectory()) {
             files = [
                 ...files,
                 ...(await getFileList(`${path}/${item.name}`)),
             ];
         } else {
             files.push(`${path}/${item.name}`);
         }
     }
     return files;
 };
 
 getFileList(path).then((files) => {
    getFreeSpace(path)
    console.log(files);
 });