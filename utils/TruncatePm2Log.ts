const path = require("node:path");

const truncateFn = async () => { 
    var fs = require("fs"); // Load the filesystem module
    var locationErr = path.join("/home/ubuntu/.pm2/logs/server-error.log");
    var locationOut = path.join("/home/ubuntu/.pm2/logs/server-out.log");
    var statsErr = fs.statSync(locationErr);
    var statsOut = fs.statSync(locationOut);
    var fileSizeInBytesErr = statsErr.size;
    var fileSizeInBytesOut = statsOut.size;
    // Convert the file size to megabytes (optional)
    var fileSizeInMegabytesErr = fileSizeInBytesErr / (1024 * 1024);
    var fileSizeInMegabytesOut = fileSizeInBytesOut / (1024 * 1024);
    if (fileSizeInMegabytesErr > 1) {
      fs.truncate(locationErr, 0, function () {
        console.log("Err file Truncate successfull");
        return 1;
      });
    } 
    if(fileSizeInMegabytesOut > 1) {
      fs.truncate(locationOut, 0, function () {
        console.log("Out file Truncate successfull");
        return 1;
      });
    } 
    console.log("File size not exceeded");
    return 0;
  };

export { truncateFn }