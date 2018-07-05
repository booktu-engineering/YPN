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
    multiple: true,
    maxFiles: 4
  })
  .then(images => {
    return images
  })
  .catch((e) => {
    console.log(e)
  })
}

export const SendToCloudinary = async (data, key) => {
  let images = [];
  RNCloudinary.init(config.cloudinaryKey, config.cloudinarySecret, config.cloud);
  if(!key) return RNCloudinary.UploadImage(data.path)


  for (let i = 0; i < data.length; i++) {
    const url = await RNCloudinary.UploadImage(data[i].path)
    images.push(url)
  }
  return images
}


export const dispatchNotification = (navigator) => (message) => {
  console.log(navigator)
  navigator.showInAppNotification({
    screen: 'App.notification',
    passProps: {
      message
    }
  })
}
