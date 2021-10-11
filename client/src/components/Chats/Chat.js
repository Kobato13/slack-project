import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import ChatBodyContainer from './ChatBodyContainer';
import { getMessage, getUser, getChannelData } from '../../api/API';
import { useParams } from "react-router-dom"
import ChatHeader from './ChatHeader';
import { io } from "socket.io-client"

function Chat({ headers }) {
  const [chatData, setChatData] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isRender, setIsRender] = useState(false);
  const chatRef = useRef(null);
  const [chatMessages, setChatMessages] = useState("")

  //parameter from URL
  const params = useParams();
  const { type, id } = params;

  const handleChatIsRender = () => {
    setIsRender(!isRender);
  }

  //Smooth scrolling to bottom
  const scrollToBottomSmooth = () => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  //Scroll to bottom on chat
  const scrollToBottom = () => {
    chatRef?.current?.scrollIntoView()
  }

  useEffect(scrollToBottom, [chatData]);

  useEffect(() => {
    //SOCKET IO
    const socket = io(`http://localhost:3100`)
    socket.on('receive-message', chatMessage => {
      setChatMessages(chatMessage)
      handleChatIsRender()
    })
    socket.on('connect', () => {
      console.log(`connected to server with id: ${socket.id}`)
    })

    //capitalize the first letter 
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    //Message Object Data
    const getMessageObj = {
      receiver_class: capitalizedType,
      receiver_id: parseInt(id),
      headers
    };
  
    const getDataObj = {
      id: parseInt(id),
      headers
    }
    
    //Get User Message Data
    getMessage(getMessageObj)
      .then(res => { setChatData(res.data.data)})
      .catch(err => console.log("Error Sending Message: ", err))

    if(type==="user"){
      //Get User Data
      getUser(getDataObj)
      .then(result => {
        setReceiver(result[0].email)
      })
    } else {
      //Get Channel Data
      getChannelData(getDataObj)
        .then(res => {
          setReceiver(res.data.data.name)
        })
    }
  scrollToBottomSmooth();
  }, [id, isRender]); 

  return (
    <ChatContainer>
      <>
        <ChatHeader 
          receiver={receiver} 
          headers={headers}
        />
        {chatMessages}
        <ChatMessages>
          <ChatBodyContainer chatData={chatData} chatRef={chatRef}/>
        </ChatMessages>
        
        <ChatInput 
          handleIsRender={handleChatIsRender} 
          headers={headers}
        />
      </>
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
  width: 100vw;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const ChatMessages = styled.div`
  padding: 3rem;
  margin-bottom: 2rem;
`;
