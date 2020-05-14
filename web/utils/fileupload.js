var config = require('../config/config');
var uploadRootPath = config['current'].UPLOAD_PATH;
console.log(" current uploadPath:========" + uploadRootPath);

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadRootPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()+ '-' + Math.round(Math.random() * 1E9);
    let name = file.originalname.split('.')[0];
    let extName = file.originalname.split('.')[1];
    let filename = uniqueSuffix + "." + extName;
    cb(null, filename)
  }
})

var upload = multer({ storage: storage })

exports.fileupload = upload;
