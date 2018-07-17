import axios from 'axios';
const url = 'https://ypn-base.herokuapp.com/'
let response;

// Basic functions
const wrapInTryCatch = async (func) => {
  try {
    return await func()
  } catch (err) {
    /* uncomment the next line if you want to log all your errors*/
    // console.log(err)
    return { error: true, err}
  }
}
// ========== Authentication requests ==========
//


// call this function with the data that you want to send to the api . this function re
const SignUpUserReq = async (data, navigator) => {
  try {
  if(!data) throw new Error('Hey man you need to send some data to the server')
  response = await axios.post(`${url}/signup`, data)
  response  
  return response;
} catch (err) {
    return { error: true, err }
  }
}

// call this function with the data the user will want to log in with. it returns a promise
const LogInUserReq = async (data) => {
  return wrapInTryCatch( async () => {
    response = await axios.post(url, data);
    return response;
  });
}

// ============= POSTS =====================

// calling this function without the second argument will fetch the timeline of the user, if
const fetchPosts = async (token, id) => {
  return wrapInTryCatch(async () => {
    // fix the headers in axios -- dont forget this;
    const path = id ? `all/${id}` : '/'
    response = axios.get(`${baseUrl}/${path}` )
    return response
  })
}

/*
  Use the method to send posts and messages to the server
  remember you can automatically disable posts from folks who need the
  anyway call this function with the body of the post and the type
  the type of a post = 0, type of a message = 1
  a valid post = { content: 'body of the message', type: (1 or 2) },
*/
const sendPost = async (data, token, type) => {
  return wrapInTryCatch(async () => {
      const post = { ...data, type }
      response = axios.post(url, post)
      return response
  });
}

//  =================== conversations ========================;

const fetchConversations = async () => {
  return wrapInTryCatch(async () => {
    const post = {};

  })
}

const 


const mockApiRequest = (data) => {
  setTimeout(() => {
    return data
  }, 3000)
}

onSubmit = () => {
  mockApiRequest(this.state.data)
  .then(() => {

  })
  .catch({

  })
}