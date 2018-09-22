const prodConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'http://localhost:5000/'
}

const devConfig = {
  baseUrl: 'http://52.47.48.167/rails/',
  notificationUrl: 'http://52.47.48.167/notifications/'
};

export default () => devConfig;
