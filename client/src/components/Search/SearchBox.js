import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../../api/API'

function SearchBox({headers, handleToggleSearchBox}) {
  const [allUsers, setAllUsers] = useState([]);
  const [searching, setSearching] = useState("");

  const searchBoxRef = useRef()

  useEffect(() => {
    const hideSearchBox = (e) => {
      if(searchBoxRef.current.contains(e.target)) return
      handleToggleSearchBox()
    }
    document.body.addEventListener("click", hideSearchBox, { capture: true })

    return () => {
      document.body.removeEventListener("click", hideSearchBox, { capture: true })
    }
  }, [])

  const viewAllUsers = () => {
    
    getAllUsers(headers)
    .then(res => {
      const userArray = res.data.data
      const resArray = userArray.filter( u => u.email.includes(searching))
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
      <LinkElement to={`/user/${user.id}`} onClick={handleToggleSearchBox}>
        <SearchBoxResults key={index}>
          <p>{user.email}</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })
  
  return (
    <SearchBoxContainer>
      <div ref={searchBoxRef}>
        <HeaderSearch>
          <input type="text" placeholder="SEARCH" onChange={handleSearch}/>
          <p onClick={handleToggleSearchBox}>x</p>
        </HeaderSearch> 
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
      </div>
    </SearchBoxContainer>
  )
}

export default SearchBox;

const SearchBoxContainer = styled.div`
  position: absolute;
  width: 60vw;
  height: 20rem;
  top: 1rem;
  left: 20rem;
  display: flex;
  padding-top: .5rem;
  align-items: flex-start;
  justify-content: center;
  overflow-y: hidden;
  
  > div {
    width: 60%;
    border-radius: .5rem;
  }
`

const HeaderSearch = styled.div`
  background-color: white;
  height: 6vh;
  width: 83%;
  padding-left: 4rem;
  padding-right: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
`

const LinkElement = styled(NavLink)`
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
