
var fs = require('fs');
var archiver = require('archiver');

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  

 class FileArchiver {
    
    constructor(){
        archive.on('error', function(err){
            throw err;
        });
    }
   
    compress(sourcePaths, destFile){
        let sources = [];
        if(!sourcePaths){return;}
        let isArry = (sourcePaths  instanceof Array);
        if (!isArry){
            sources.push(sourcePaths);
        }else{
            sources = sourcePaths;
        }
        var output = fs.createWriteStream(destFile);
        archive.pipe(output);
        sources.forEach(function(path){
            archive.directory(path, false);
        });
        archive.finalize();
    }
    
}


module.exports = FileArchiver;



