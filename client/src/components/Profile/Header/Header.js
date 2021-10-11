import React, { useState } from 'react'
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchBox from '../../Search/SearchBox'
import { useHistory } from "react-router-dom";


function Header({ headers }) {
  const [toggleSearch, setToggleSearch] = useState(false)

  const id  = localStorage.getItem('id')
  const history = useHistory()

  const handleToggleSearchBox = () => {
    setToggleSearch(!toggleSearch)
  }

  //Logout
  const handleLogout = () => {
    history.push('/')
    localStorage.clear()
    window.location.reload()
  }
  
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Image>
          <img src={`https://picsum.photos/id/${id}/40`} alt=""/> 
        </Image>
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <button onClick={handleToggleSearchBox}>
          <span>SEARCH</span>
        </button>
      </HeaderSearch> 
      <HeaderRight>
        <HelpOutlineIcon />
        <button onClick={handleLogout}>Log Out</button>
      </HeaderRight>
      {toggleSearch ? (
        <SearchBox 
          handleToggleSearchBox={handleToggleSearchBox}
          headers={headers}
        />
      ) : null}

    </HeaderContainer>
)
}

export default Header

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: grey;
  border: 1px gray solid;
  
  > button {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw ;
    outline: 0;
    color: white;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const Image = styled.div`
  overflow: hidden;
  > img {
    border-radius: 50%;
  }
`;