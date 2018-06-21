const Authenticate = (data, navigate, type) => (dispatch) => {
  // if type === 1 Login, if 2 sign up - dynamically choose url
  axios.post(`${baseUrl}/${returnUrl(type)}`, data)
  .then(data => {
    // cache the data then navigate

  })
  .catch(err => {
    // dispatch the error to state
  })
}

// if there is an id // remember that this needs a token
const fetchPosts = (token, id) => {
  if(!id) return fetchTimeLine()
  axios.get('/')
}


const returnUrl = (type) => type === 1 ? 'login' : 'signup'
