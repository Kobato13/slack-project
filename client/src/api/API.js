import axios from 'axios';

//Registration
export const userRegister = ({ email, password, password_confirmation }) => {
  return axios.post('http://206.189.91.54//api/v1/auth/', {
    email, password, password_confirmation
  })
    .then(res => res)
    .catch(err => err)
};

//Login
export const userLogin = ({ email, password }) => {
  return axios.post('http://206.189.91.54//api/v1/auth/sign_in', {
    email, password
  })
    .then(resp => resp)
    .catch(err => err)
};

//Send Message 
export const sendMessage = ({
  receiver_id, receiver_class, body, headers: { token, client, expiry, uid }
}) => {
  return axios.post('http://206.189.91.54//api/v1/messages',
    {
      receiver_id,
      receiver_class,
      body
    },
    {
      headers: {
        'access-token': token,
        'client': client,
        'expiry': expiry,
        'uid': uid
      }
    })
    .then(res => res)
    .then(result => result)
    .catch(err => err)
};

//Get Messages
export const getMessage = ({
  receiver_class, receiver_id, headers: { token, client, expiry, uid }
}) => {
  return axios.get('http://206.189.91.54//api/v1/messages',
    {
      headers: {
        'access-token': token,
        'client': client,
        'expiry': expiry,
        'uid': uid
      },
      params: {
        receiver_class,
        receiver_id
      }
    })
  .then(response => response)
  .then(result => result)
  .catch(err => err)
};

//Get All User Data
export const getAllUsers = ({ token, client, expiry, uid }) => {
  return axios.get(`http://206.189.91.54//api/v1/users`, {
    headers: {
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid
    }
  })
    .then(res => res)
    .then(result => result)
    .catch(err => err)
};

//Get user via id
export const getUser = ({ id, headers: { token, client, expiry, uid } }) => {
  return axios.get('http://206.189.91.54//api/v1/users', {
    headers: {
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid
    }
  })
    .then(res => res)
    .then(result => {
      return result.data.data.filter(data => data.id === id)
    })
    .catch(err => err)
};

//Get Channel
export const getChannel = ({ headers: { token, client, expiry, uid } }) => {
  return axios.get(`http://206.189.91.54//api/v1/channels`,
    {
      headers: {
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid
      }
    })
      .then(res => res)
      .then(result => result)
      .catch(err => err)
};

//Get Channel via ID
export const getChannelData = ({ id, headers: { token, client, expiry, uid } }) => {
  return axios.get(`http://206.189.91.54//api/v1/channels/${id}`,
    {
      headers: {
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid
      }
    })
      .then(res => res)
      .then(result => result)
      .catch(err => err)
};

//Get Recent Messages
export const getRecentDm = ({ headers: { token, client, expiry, uid } }) => {
  return axios.get(`http://206.189.91.54//api/v1/users/recent/`, {
    headers: {
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid
    }
  })
    .then(res => res)
    .catch(err => err)
};


//Get user owned channel
export const getOwnedChannel = ({ headers: { token, client, expiry, uid } }) => {
  return axios.get(`http://206.189.91.54//api/v1/channel/owned`, {
    headers: {
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid
    }
  })
    .then(res => res)
    .catch(err => err)
};

//Add a member to the channel
export const addMemberToTheChannel = ({ id, member_id, headers:{ token, client, expiry, uid } }) => {
  return axios.post(`http://206.189.91.54//api/v1/channel/add_member`, 
  {
    id,
    member_id
  },
  {
    headers:{
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid,
    }
  })
  .then(response => response)
  .then(result => result)
  .catch(error => error)
}

//Add channel

export const addChannel = ({ name, user_ids, headers:{ token, client, expiry, uid } }) => {

  return axios.post('http://206.189.91.54//api/v1/channels',
  {
    name,
    user_ids
  },
  {
    headers:{
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid,
    }
  })
  .then(response => response)
  .then(result => result)
  .catch(error => error)
}