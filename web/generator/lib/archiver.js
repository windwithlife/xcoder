
var fs = require('fs');
var archiver = require('archiver');

const DOWNLOAD_PATH = '/tmp/my-uploads/';

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  

 class FileArchiver {
    
    constructor(){
        this.destPath = DOWNLOAD_PATH;
        archive.on('error', function(err){
            throw err;
        });
    }
   
    compress(sourcePaths, destFilename){
        let filename = this.destPath + "/" + destFilename;
        let sources = [];
        if(!sourcePaths){return;}
        let isArry = (sourcePaths  instanceof Array);
        if (!isArry){
            sources.push(sourcePaths);
        }else{
            sources = sourcePaths;
        }
        var output = fs.createWriteStream(filename);
        archive.pipe(output);
        sources.forEach(function(path){
            let arr = path.split('/');
            let dname = arr[arr.length -1];
            if (dname ==""){
                dname = arr[arr.length -2];
            }
            console.log("origin name:" + arr);
            console.log("directory name:" + dname);
            archive.directory(path, dname);
        });
        archive.finalize();
    }
    
}


module.exports = FileArchiver;



