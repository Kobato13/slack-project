import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from '@material-ui/icons/Email';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SidebarOption from "./SidebarOption";
import { useHistory, NavLink } from "react-router-dom";
import AddChannel from "./Channels/AddChannel";
import "./Sidebar.css";

function Sidebar({channelsJoined, recentUsers, 
  headers, channelsOwned, handleIsRender }) {

  const [togDropdown, setTogDropdown] = useState(true)
  const [toggleAddChannel, setToggleAddChannel] = useState(false)
  const [togChannelOwnedDropdown, setTogChannelOwnedDropdown] = useState(true)
  const [togChannelJoinedDropdown, setTogChannelJoinedDropdown] = useState(true)
  const [togRecentUsersDropdown, setTogRecentUsersDropdown] = useState(true)

  const handleToggleDropdown = () => {
    setTogDropdown(!togDropdown)
  }

  const handleToggleAddChannel = () => {
    setToggleAddChannel(!toggleAddChannel)
  }

  const handleToggleChannelOwnedDropdown = () => {
    setTogChannelOwnedDropdown(!togChannelOwnedDropdown)
  }

  const handleToggleChannelJoinedDropdown = () => {
    setTogChannelJoinedDropdown(!togChannelJoinedDropdown)
  }

  const handleTogRecentUsersDropdown = () => {
    setTogRecentUsersDropdown(!togRecentUsersDropdown)
  }
  
  //new message
  //const userID = loginUserData && loginUserData.data ? loginUserData.data.id : null;
  //Get the id in local storage
  const userID  = parseInt(localStorage.getItem('id'))
  const email  = localStorage.getItem('email')
  const history = useHistory();
  
  const newMessageHistory = () => {
    history.push(`/new-message`)
  };
  
  //Render Owned Channel 
  const renderOwnedChannel = channelsOwned
    ? channelsOwned.map((channel, index) => {
      return (
        <NavLink
          style={{ textDecoration: 'none', color: 'white' }}
          to={`/channel/${channel.id}`}
          key={index}>
          <SidebarOption
            Icon={ChatBubbleIcon}
            title={channel.name}
          />
        </NavLink>
      )
    })
    : ""

  //Render all channel 
  const renderChannels = channelsJoined
    ? channelsJoined.map((channel, index) => {
      if (userID !== channel.owner_id)
        return (
          <NavLink 
            style={{textDecoration: 'none', color: 'white'}} 
            to={`/channel/${channel.id}`}
            key={index}>
            <SidebarOption
              Icon={InsertCommentIcon}
              title={channel.name}
            />
          </NavLink>
        )
      })
    : ""

  //Recent messages
  const renderRecentUsers = recentUsers
    ? recentUsers.map((user, index) => {
      if (user.id !== userID)
        return (
          <NavLink 
            style={{textDecoration: 'none', color: 'white'}} 
            to={`/user/${user.id}`}
            key={index}>
            <SidebarOption
              Icon={PeopleAltIcon}
              title={user.uid}
            />
          </NavLink>
        )
      })
    : ""

  const userName = email.split("@")[0]
  const capitalizedUser = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <SidebarContainer>
      <SidebarHeader>
      <SidebarInfo>
        <h2>{email}</h2>
        <h3>
        <FiberManualRecordIcon />
        {capitalizedUser}
        </h3>
      </SidebarInfo>
      <CreateIconStyle onClick={newMessageHistory}/>
      </SidebarHeader>
      <div className={togDropdown
        ? `sidebar-channels` : `sidebar-channels hidden`}>
        <SidebarOption Icon={InsertCommentIcon} title="Threads" />
        <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
        <SidebarOption Icon={DraftsIcon} title="Saved items" />
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
        <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
        <SidebarOption Icon={AppsIcon} title="Apps" />
        <SidebarOption Icon={FileCopyIcon} title="File browser" />
      </div>
      <SidebarOption 
        Icon={togDropdown
          ? ExpandLessIcon
          : ExpandMoreIcon} 
        title={togDropdown ? `Show less` : `Show more`}
        onClick={handleToggleDropdown}
      />
      <hr />
      <SidebarOption 
        Icon={AddIcon} 
        title="Add Channel" 
        onClick={handleToggleAddChannel}
      />
      <hr/>
      {toggleAddChannel ? (
        <AddChannel 
          headers={headers}
          handleToggleAddChannel = {handleToggleAddChannel}
          handleIsRender={handleIsRender} 
        /> 
      ): null} 
      <SidebarOption 
        Icon={togChannelOwnedDropdown
          ? ExpandMoreIcon
          : ExpandLessIcon} 
        title="Channels Owned" 
        onClick={handleToggleChannelOwnedDropdown}
      />
      <div className={togChannelOwnedDropdown 
        ? `sidebar-channels` : `sidebar-channels hidden`}>
        {renderOwnedChannel}
      </div>
      <hr />
      <SidebarOption 
        Icon={togChannelJoinedDropdown
          ? ExpandMoreIcon
          : ExpandLessIcon} 
        title="Channels Joined" 
        onClick={handleToggleChannelJoinedDropdown}
      />
      <div className={togChannelJoinedDropdown 
        ? `sidebar-channels` : `sidebar-channels hidden`}>
        {renderChannels}
      </div>
      <hr />
      <SidebarOption 
        Icon={togRecentUsersDropdown
          ? ExpandMoreIcon
          : ExpandLessIcon} 
        title="Direct Messages" 
        onClick={handleTogRecentUsersDropdown}
      />
      <div className={togRecentUsersDropdown 
        ? `sidebar-channels` : `sidebar-channels hidden`}>
        {renderRecentUsers}
      </div>

    </SidebarContainer>
  
  )
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.5;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: auto;

  >hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 1000px;
  }
  `;

const SidebarInfo = styled.div`
flex: 1;

> h2 {
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 5px;
}

> h3 {
  display: flex;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 5px;
}

> h3 > .MuiSvgIcon-root {
  font-size: 14px;
  font-weight: 400;
  margin-top: 1px;
  margin-right: 2px;
  color: green;
}
`;

const CreateIconStyle = styled(CreateIcon)`
  cursor: pointer;
`