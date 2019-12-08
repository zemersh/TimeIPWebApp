const express = require('express');
var os = require('os');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/time',function(req,res){
  res.sendFile(path.join(__dirname+'/templates/time.html'));
});

router.get('/address',function(req,res){
  var addresses = getIpAddress();
  res.sendFile(path.join(__dirname+'/templates/address.html'));
  res.send(`${addresses}`);
});

function getIpAddress(){
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}


//add the router
app.use('/', router);
app.listen(process.env.port || 8090);

console.log('Running at Port 8090');