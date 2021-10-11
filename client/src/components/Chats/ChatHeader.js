import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getChannelData, getAllUsers, addMemberToTheChannel } from '../../api/API';
import styled from "styled-components";
import AddMember from '../AddMember';

function ChatHeader({ receiver, headers }) {
  //state
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberInfo, setChannelMemberInfo] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const [toggleViewMembers, setToggleViewMembers] = useState(false)
  const [toggleAddMembers, setToggleAddMembers] = useState(false)
  const [addUserArray, setAddUserArray] = useState([])
  const [isRender, setIsRender] = useState(false)

  //parameter for URL
  const params = useParams();
  const { type, id } = params;

  const handleIsRender = () => {
    setIsRender(!isRender)
  }

  const handleToggleViewMembers = () => {
    setToggleViewMembers(!toggleViewMembers)
  }

  const handleToggleAddMembers = () => {
    setToggleAddMembers(!toggleAddMembers)
  }

  const handleAddMemberstoArray = (data) => {
    setAddUserArray(data)
    //console.log(data)
  }

  const handleSubmitAddedMembers = () => {
    handleToggleAddMembers(false)
    addUserArray.map(users => {
      let AddedMembersArrayObj = {
        id: parseInt(id),
        member_id: users.id,
        headers
      }
      //console.log(AddedMembersArrayObj)
      addMemberToTheChannel(AddedMembersArrayObj)
        .then(res => {
          console.log("User Added Succesful!", res)
          handleIsRender()
        })
        .catch(err => console.log(err))
    })
  }

  useEffect(() => {
    //data obj
    const getDataObj = {
      id: parseInt(id),
      headers
    }
    
    getAllUsers(headers)
    .then(res => {
      setAllUsers(res.data.data)
      getChannelData(getDataObj)
      .then(res => {
        setChannelMembers(res.data.data.channel_members)
      })
      .catch(err => err)
    })
    .catch(err => err)

  }, [id, isRender])

  useEffect(() => {
    setChannelMemberInfo([])
    channelMembers.forEach(member => {
      const membersInfo = allUsers.find(user => user.id === member.user_id)
      setChannelMemberInfo(prev => [...prev, membersInfo])
    })
  }, [channelMembers])

  const memberList = channelMemberInfo.map((user, index) => {
    return(
      <div key={index}>
        <p>{user.email}</p>
      </div>
    )
  })

  return (
    <ChatHeaderContainer>
      <HeaderLeft>  
        <h2>
          <strong>{type === "channel" ? receiver : receiver}</strong>
        </h2>
      </HeaderLeft>
      {type === "channel" ? 
        <HeaderRight>
          <button onClick={handleToggleViewMembers}>Member List</button>
          <button onClick={handleToggleAddMembers}>Add Member</button>
        </HeaderRight>
      : ""}
      {toggleViewMembers 
        ? 
        <MemberList>
          {memberList}
        </MemberList>
        : ""
      }
      {toggleAddMembers 
        ? 
        <MemberList>
          <AddMember 
            headers={headers} 
            handleToggleAddMembers={handleToggleAddMembers}
            handleAddMemberstoArray={handleAddMemberstoArray}
          />
          <button onClick={handleSubmitAddedMembers}>Add Members!</button>
        </MemberList>
        : ""
      }
      
    </ChatHeaderContainer>
  )
}

export default ChatHeader

const ChatHeaderContainer = styled.div`
  display: flex;
  height: 3rem;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  text-transform: lowercase;
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;

  > button {
    margin: 1vh;
  }
`;

const MemberList = styled.div`
  position: absolute;
  background: gray;
  height: 40rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: .5rem;
  transform: translateX(10rem);
`