const {Images,validation} = require('../model/image')
const config = require('config')
const express = require('express')
const route = express()
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');


const url = config.get('db')
const storage = new GridFsStorage({url:url,options:{useUnifiedTopology: true} });
const upload = multer({ storage });

  route.post('/',upload.single('file'), async(req, res, next) => {
    console.log(req.body);
    const {error} = validation(req.body)
      if (!error) {
      

            let newImage = new Images({
                caption: req.body.caption,
                filename: req.file.filename,
                fileId: req.file.id,
            });

         newImage = await newImage.save()
                res.status(200).json({
                        success: true,
                        newImage,
                    });
                
        
      } else {
        res.status(500).json(error.details[0].message)
    }  
      
   
})

  module.exports = route