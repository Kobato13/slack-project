import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { userRegister } from '../../api/API';
import { LoginContainer,LoginInnerContainer,Form,} from "../styles/Login.style"
import {useHistory} from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState(''); //Email
    const [password, setPassword] = useState(''); // Password
    const [loading, setLoading] = useState(false); //Loading 
    const history = useHistory(); // push history
    
    //Register Button
    const handleRegister = (e) => {
    //prevent page refresh
    e.preventDefault()
    //set loading to true
    setLoading(true)
    
    const data = {
      email,
      password,
      password_confirmation: password
    };

    //Register API
    userRegister(data)
      .then(() => {
        history.push('/slack-api'); //push to login
        setLoading(false);
      })
      .catch(() => {
        alert(`email already taken`);
        setLoading(false);
      }
      );
    }

    return (
    <LoginContainer>
        <LoginInnerContainer>
            <img
                src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
                alt="slack logo" 
            />
            <h1>Sign up to Slack</h1>
            <Form>
            <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder='sample@email.com'
                type='email'
                title='email'
                />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                type='password'
                title='password'
            />
            <input
                onClick={handleRegister}
                type='submit'
                value={loading ? "Loading..." : "Register"}
                disabled={loading}
            />
            </Form>
        </LoginInnerContainer>
        <p>
            Already a user? <Link to="/slack-api" >Login </Link>
        </p>
    </LoginContainer>
)
};


export default Register
