import React, { useState } from 'react'
import styled from 'styled-components';
import { getAllUsers, getUser } from '../api/API'

function AddMember({
  headers, handleToggleAddMembers, channelName="", handleAddMemberstoArray=null}) {

  const [allUsers, setAllUsers] = useState([]);
  const [searching, setSearching] = useState("");
  const [warning, setWarning] = useState(false);
  const [toggleSearchUserList, setSearchUserList] = useState(false);
  const [clickedUserData, setClickedUserData] = useState([])

  const removeAddedUser = (id) => {
    const updatedList = clickedUserData.filter(user => user.id !== id)
    setClickedUserData(updatedList)
  }

  const clickedUser = (data) => {
    setSearching("")
    setSearchUserList(false)

    // Checking if there's already a user in the array
    const isUserinArray = [...clickedUserData]
    const found = isUserinArray.some(user => user.id === data.id)
    if(found) return setWarning(true) 

    // Since state was previously empty, we need to add it to an array first
    const updatedClickedUserArray = [...clickedUserData, data]
    setWarning(false)
    setClickedUserData(updatedClickedUserArray)

    // This is where you add the array data to Chatheader
    if(handleAddMemberstoArray !==null) handleAddMemberstoArray(updatedClickedUserArray)
  }

  const userSearchDetails = (id) => {
    const getUserObj = {
      id,
      headers
    }

    getUser(getUserObj)
      .then(res => {
        //console.log(res[0])
        clickedUser(res[0])
      })
      .catch(err => console.log(err))
  }

  const viewAllUsers = () => {
    
    getAllUsers(headers)
      .then(res => {
        const userArray = res.data.data
        const resArray = userArray.filter( u => u.email.includes(searching))
        setAllUsers(resArray)
      })
      .catch(err => err)
  }

  const handleSearch = (e) => {
    setSearching(e.target.value);
    viewAllUsers()
  }

  const handleSearchUserList = () => {
    setSearchUserList(!toggleSearchUserList);
  };

  const searchUserList = allUsers.map((user, index) => {
    return(
      <LinkElement onClick={() => userSearchDetails(user.id)} key={index}>
        <SearchBoxResults>
          <p>{user.email}</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  const displayAddedUsers = clickedUserData.map((user) => {
    return(
      <div>
        <h3>{user.email}</h3>
        <p onClick={() => removeAddedUser(user.id)}>x</p>
      </div>
    )
  })

  
  return (
    <AddMemberContainer>
      <p style={{color: 'black'}}>{channelName}</p>
      <HeaderSearch>
          <input 
            type="text" 
            placeholder="SEARCH" 
            onChange={handleSearch}
            onClick={handleSearchUserList}
            value={searching}
          />
          <p onClick={handleToggleAddMembers}>x</p>
          {warning ? <label>User is already added</label> : ""}
      </HeaderSearch>
      {toggleSearchUserList ? 
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
      : "" }
      <div>
        {displayAddedUsers}
      </div>
    </AddMemberContainer>
  )
}

export default AddMember

const AddMemberContainer = styled.div`
  
`

const HeaderSearch = styled.div`
  background-color: white;
  margin-top: 1rem;
  height: 3rem;
  width: 25rem;
  display: flex;
  padding-right: 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border-bottom: 1px gray solid;
  
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
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

const SearchBoxResult = styled.div`
  width: 26rem;
  max-height: 30rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 0.5rem;
`

const LinkElement = styled.div`
  text-decoration: none;
`

const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;
  background: white;

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
