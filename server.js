// server.js
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.json({limit: '50mb'}));
// const storage = multer.diskStorage({
//     destination: 'uploads/',
//     filename: function(req, file, cb){
//       cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });
  
// var upload = multer({dest: './uploads/'}).single('userFile');
//   app.post('/api/upload',function(req,res){
//       console.log(req.files);

//       upload(req,res,function(err) {
//           if(err) {
//               return res.next("Error uploading file.");
//           }
//           res.json({"msg":"File is uploaded"});
//       });
//   });
const userFiles = './upload/';
app.use('/api/upload', express.static(userFiles));
app.set('views', './dist/browser');
app.put('/api/upload', (req, res) => {
    const file = req.body;
    const base64data = file.content.replace(/^data:.*,/, '');
    fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.set('Location', userFiles + file.name);
        res.status(200);
        res.send({msg:'file uploaded successful'});
      }
    });
   });

app.listen(3000, () => {
    console.log(`Server started...`);
});
