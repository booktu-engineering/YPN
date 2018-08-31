const prodConfig = {
  baseUrl: 'https://ypn-base.herokuapp.com/',
  notificationUrl: 'https://ypn-'
}

const devConfig = {
  baseUrl: 'http://localhost:3000/',
  notificationUrl: 'http://localhost:5000/'
}

export default () => {
  return process.env.NODE_ENV === 'production' ? prodConfig : devConfig
}
