const prodConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'http://localhost:5000/'
}

const devConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'https://yon-notification.herokuapp.com/'
};

export default () => devConfig;
