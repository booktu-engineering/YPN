const prodConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'https://yon-notification.herokuapp.com/'
}

const devConfig = {
  baseUrl: 'http://localhost:3000/',
  notificationUrl: 'https://ypn-notification-api.herokuapp.com/'
}

export default () => {
  return process.env.NODE_ENV === 'production' ? prodConfig : devConfig
}
