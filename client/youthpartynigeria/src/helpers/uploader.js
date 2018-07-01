import * as RNCloudinary from 'react-native-cloudinary-x';
import ImagePicker from 'react-native-image-crop-picker';
import config from '../config/';

export const SingleUpload = () => {
  return ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  })
  .then(image => SendToCloudinary(image))
  .catch((e) => {
    console.log(e);
  })
}

export const MultipleUpload = () => {
  return ImagePicker.openPicker({
    multiple: true
  })
  .then(images => SendToCloudinary(images, 'multiple'))
  .catch((e) => {
    throw e
  })
}

const SendToCloudinary = (data, key) => {
  let images = [];
  RNCloudinary.init(config.cloudinaryKey, config.cloudinarySecret, config.cloud);
  if(!key) return RNCloudinary.UploadImage(data.path)


  // upload multiple images
  for (let image of data) {
    RNCloudinary.uploadImage(image.path)
    .then(response => images.push(response.secure_url))
    .catch(e => { throw e })
  }
  return images;
}
