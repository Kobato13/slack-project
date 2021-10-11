import React from 'react';
import ChatBody from './ChatBody';
import styled from "styled-components";

function ChatBodyContainer({ chatData, chatRef}) {

  return (
    <ChatBodyContainerStyle>
      {chatData.length > 0
      ? chatData.map(data=> <ChatBody key={data.id} data={data}/>)
      : ""}
      <ChatBottom ref={chatRef}/>
    </ChatBodyContainerStyle>
  );
};

export default ChatBodyContainer;
const ChatBodyContainerStyle= styled.div`
  width: 100%;
  height: 42rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatBottom = styled.div`
  padding-bottom: 1px;
`