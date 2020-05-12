
var fs = require('fs');
var archiver = require('archiver');

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
        archive.bulk([
            { src: sources}
        ]);
        archive.finalize();
    }
    
}


module.exports = FileArchiver;



