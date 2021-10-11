import React from 'react';
import styled from "styled-components";
import Moment from 'react-moment';

function ChatBody({data}) {

  const { body, created_at, sender: { id, email } } = data;

  return (
    <ChatBodyContainerStyle>
      <Image>
        <img src={`https://picsum.photos/id/${id}/40`} alt=""/> 
      </Image>
      <ChatBodySubContainerStyle>
        <ChatDetailsStyle>
          <h3>{email.split("@")[0]}</h3>
          <label><Moment fromNow ago date={created_at} /> ago</label>
        </ChatDetailsStyle>
        <ChatBodyStyle>
          {body}
        </ChatBodyStyle>
      </ChatBodySubContainerStyle>
    </ChatBodyContainerStyle>
  );
};

export default ChatBody;

const ChatBodyContainerStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Image = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  > img {
    border-radius: 50%;
  }
`;

const ChatBodySubContainerStyle = styled.div`
  display: flex;
  flex-direction: column
`

const ChatDetailsStyle = styled.div`
  display: flex;
  flex-direction: row;

  > label {
    padding-left: 1rem;
    color: gray;
    font-size: 0.8rem;
  }
`

const ChatBodyStyle = styled.div`

`;