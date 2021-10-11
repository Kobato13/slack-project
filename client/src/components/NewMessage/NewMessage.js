import React, { useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function NewMessage({headers}) {

  const [allUsers, setAllUsers] = useState([]);
  const [searching, setSearching] = useState("");

  const viewAllUsers = () => {
    const { token, client, expiry, uid  } = headers
    
    axios.get('http://206.189.91.54//api/v1/users',
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(res => {
      const userArray = res.data.data
      const resArray = userArray.filter(u => u.email.includes(searching))
      setAllUsers(resArray)
      //console.log(resArray)
    })
    .catch(err => err)
  }

  const handleSearch = (e) => {
    setSearching(e.target.value);
    viewAllUsers()
  }

  const searchUserList = allUsers.map((user, index) => {
    return(
      <LinkElement to={`/user/${user.id}`}>
        <SearchBoxResults key={index}>
          <p>{user.email}</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  return (
    <ChatContainer>
      <>
        <ChatHeaderContainer>
          <HeaderLeft>  
            <h2>
              <strong>New Message</strong>
            </h2>
          </HeaderLeft>
        </ChatHeaderContainer>
        <ChatHeaderTo>
          <h1>To: </h1>
          <input type="text" onChange={handleSearch}/>
        </ChatHeaderTo>
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
      </>
    </ChatContainer>
  )
}

export default NewMessage


const ChatContainer = styled.div`
  width: 100vw;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  text-transform: lowercase;
`;

const ChatHeaderTo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;

  > input {
    width: 80%;
    background-color: transparent;
    border: none;
    padding-left: 2rem;
    color: black;
    outline: 0;
    font-weight: bolder;
    font-size: 1rem;
  }

  > p {
    color: black;
    cursor: pointer;
  }
`;

const LinkElement = styled(NavLink)`
  text-decoration: none;
`

const SearchBoxResult = styled.div`
  width: 90%;
  padding-left: 3rem;
  max-height: 30rem;
  overflow-y: scroll;
`

const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;
  background: #F7F7F7;

  > p {
    font-size: 1rem;
    font-weight: bolder;
    padding-left: 1rem;
    letter-spacing: .2px;
    color: black;
  }

  :hover {
    background-color: #135999;

    > p {
      color: white;
    }
  }
`