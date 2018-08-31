const prodConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'http://localhost:5000/'
}

const devConfig = {
  baseUrl: 'http://localhost:3000/',
  notificationUrl: 'http://localhost:5000/'
}

export default () => devConfig;
