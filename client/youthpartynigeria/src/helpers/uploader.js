import * as RNCloudinary from 'react-native-cloudinary-x';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import config from '../config/';


export const StartProcess = navigator => {
  navigator.showLightBox({
    screen: 'Process.Indicator',
  })
}

export const EndProcess = navigator => {
  navigator.dismissLightBox({});
}

export const formatDate = date => moment(new Date(date)).fromNow() || '10 mins';

export const formatImageQuality = (string) => {
  const link = [...string.split('/').slice(0, 6), 'q_50', ...string.split('/').slice(6, string.split('/').length)]
  return link.join('/');
}

export const SingleUpload = (navigator) => ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
})
  .then(image => SendToCloudinary(image, undefined, navigator))
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

export const SendToCloudinary = async (data, key, navigator) => {
  navigator && StartProcess(navigator)
  const images = [];
  RNCloudinary.init(config.cloudinaryKey, config.cloudinarySecret, config.cloud);
  if (!key) return RNCloudinary.UploadImage(data.path);


  for (let i = 0; i < data.length; i++) {
    const url = await RNCloudinary.UploadImage(data[i].path);
    images.push(formatImageQuality(url));
  }
  navigator && EndProcess(navigator)
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
