import * as RNCloudinary from 'react-native-cloudinary-x';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import config from '../config/';

export const formatDate = date => moment(new Date(date)).fromNow() || '10 mins';

export const SingleUpload = () => ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
})
  .then(image => SendToCloudinary(image))
  .catch((e) => {
    console.log(e);
  });

export const MultipleUpload = () => ImagePicker.openPicker({
  multiple: true,
  maxFiles: 4
})
  .then(images => images)
  .catch((e) => {
    console.log(e);
  });

export const SendToCloudinary = async (data, key) => {
  const images = [];
  RNCloudinary.init(config.cloudinaryKey, config.cloudinarySecret, config.cloud);
  if (!key) return RNCloudinary.UploadImage(data.path);


  for (let i = 0; i < data.length; i++) {
    const url = await RNCloudinary.UploadImage(data[i].path);
    images.push(url);
  }
  return images;
};


export const dispatchNotification = navigator => (message) => {
  navigator.showInAppNotification({
    screen: 'App.notification',
    passProps: {
      message
    }
  });
};

export const StartProcess = navigator => {
  navigator.showLightBox({
    screen: 'Process.Indicator',
  })
}

export const EndProcess = navigator => {
  console.log('closing');
  navigator.dismissLightBox({});
}
