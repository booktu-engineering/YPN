import multer from 'multer';
import cloudinary from 'cloudinary';
import { config } from './config'

export const imageParser = multer();
export const imageUploader = cloudinary.config(config);


const imageMiddleware = async (req, res, next) => {
  await imageParser.single(req);
  // remember to check the extension of the file
  if (req.file) {
    imageUploader.upload(req.file, (err, result) => {
      if (err) {
        console.log(err);
        const e = new Error('Something went wrong trying to upload your image');
        e.status = 422;
        return next(e);
      }
      req.image = result.secure_url;
      req.body = { ...req.body, image: result.secure_url };
      next();
    });
  }
  next();
};
