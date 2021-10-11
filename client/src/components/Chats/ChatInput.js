import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from "styled-components";
import { sendMessage } from '../../api/API';
import { useParams } from "react-router-dom";
import { io } from "socket.io-client"

function ChatInput({ handleIsRender, headers}) {
  const [chatMessage, setChatMessage] = useState('');

  //get parameter from URL
  const params = useParams();
  const { type, id } = params;

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  
  //message objects 
  const messageObj = {
    receiver_id: parseInt(id),
    receiver_class: capitalizedType,
    body: chatMessage,
    headers
  }

  //Message input
  const handleSendMessage = (e) => {
    setChatMessage(e.target.value);
  }
  
  //
  const handleMessage = (e) => {
    e.preventDefault()

    //SOCKET IO
    const socket = io(`http://localhost:3100`)
    socket.emit("send-message", chatMessage)

    //Send Message API 
    sendMessage(messageObj)
      .then(res => {
        handleIsRender();
      })
      .catch(err => console.log('Error Sending Message: ', err));
    
    //Set input to blank
    setChatMessage("");
  }

    return (
    <ChatInputContainer>
        <form >
        <input
          type="text"
          placeholder={'room'}
          onSubmit={handleMessage}
          value={chatMessage}
          onChange={handleSendMessage}
        />
        <Button
            type='submit'
            onClick={handleMessage}
        > Send
        </Button>
        </form>
    </ChatInputContainer>
    )
    }

    export default ChatInput

    const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
    position: relative;
    display: flex;
    justify-content: center;
    }

    >form >input{
    position: fixed;
    bottom: 2rem;
    width: 70%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 1rem;
    outline: none;
    }
    >form >button{
    display: none;
    }
    `;
