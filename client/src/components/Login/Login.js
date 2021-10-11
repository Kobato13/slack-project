import React, { useState, useEffect } from 'react';
import { LoginContainer, LoginInnerContainer, Form} from "../styles/Login.style"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { userLogin } from '../../api/API';

function Login() {
  //set up states
  const [email, setEmail] = useState('ayaya2@gmail.com')
  const [password, setPassword] = useState('123123')
  //state for loading
  const [loading, setLoading] = useState(false)
  //for history push
  const history = useHistory()
  //user login data
  const [loginData, setLoginData] = useState()

  useEffect(() => {
    
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    setLoading(true)
    const data = { email, password }

    //User Login
    userLogin(data)
      .then(res => {
        localStorage.setItem('id', res.data.data.id);
        localStorage.setItem('email', res.data.data.email);
        localStorage.setItem('access-token', res.headers['access-token']);
        localStorage.setItem('client', res.headers['client']);
        localStorage.setItem('expiry', res.headers['expiry']);
        localStorage.setItem('uid', res.headers['uid']);
        history.push('/home');
        setLoading(false)
      })
      .catch(err => err);
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
          alt="slack logo" 
        />
        <h1>Sign in to Slack</h1>
        <Form>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder='sample@email.com'
            value={email}
            type='email'
            title='email'
            />
          <input 
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            value={password}
            type='password'
            title='password'
          />
          <input
            onClick={handleLogin}
            type='submit'
            value={loading ? "Loading..." : "Submit"}
            disabled={loading}
          />
        </Form>
      </LoginInnerContainer>
      <p>
        Not an User? <Link to="/Register" >Register </Link>
      </p>
    </LoginContainer>
  )
}

export default Login;