var express = require('express');
var cors = require('cors');
var multer = require('multer');
const fs = require('fs');
const upload = multer({dest: "upload/"});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  const file = req.file;
  if(!file) res.json({error: "No file"});
  else {
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });
    fs.unlink(file.path,(err) => {
    if (err) {
      console.error(err)
      return
    }})
  } 
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
