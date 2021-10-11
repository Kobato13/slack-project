import styled from 'styled-components'
import React, { useState} from 'react';
import AddMember from '../../../AddMember'
import { addChannel } from "../../../../api/API"
import { useHistory } from "react-router-dom"

function AddChannel({ headers, handleToggleAddChannel, handleIsRender}) {

  //state
  const [channelName, setChannelName] = useState('')
  const [errorWarning, setErrorWarning] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [usersDataArray, setUsersDataArray] = useState([])
  const [addMemberToggle, setAddMemberToggle] = useState(false)

  const history = useHistory()

  const handleGetAddMembersArray = (data) => {
    //console.log(data)
    const membersID = data.map(user => user.id)
    setUsersDataArray(membersID)
    //console.log(membersID)
    console.log(usersDataArray)
  }

  const handleToggleAddMembersForm = () => {
    setAddMemberToggle(!addMemberToggle)
  }

  //channel name value
  const handleChannelInput = (e) => {
    setChannelName(e.target.value);
  }

  const handleAddChanneltoAddMembers = (e) => {
    e.preventDefault();
    
    if(channelName.length < 3 || (channelName === "") 
    || channelName.length > 15){
      setErrorText("Error: can't add channel")
      return setErrorWarning(true)
    }
    // When you click next, AddMember component will toggle to true
    handleToggleAddMembersForm()
    setErrorText("")
    setErrorWarning(false)
  }

  const createChannel = () => {
    
    const addNewChannelObj = {
      name: channelName,
      user_ids: usersDataArray,
      headers: headers,
    }  
    
    addChannel(addNewChannelObj)
    .then(res => {
      const channelID = res.data.data.id
      handleToggleAddChannel()
      history.push(`/channel/${channelID}`)
      console.log("successfully added", res)
    })
    .catch(error => error)

    handleIsRender()
    setErrorWarning(false) 
  }

  return (
    <AddChannelOuterContainer>
      <AddChannelContainer>
        {!addMemberToggle ?
          <AddChannelForm onSubmit={handleAddChanneltoAddMembers} >
            <AddChannelInput 
              placeholder='Add Channel Name' 
              onChange={handleChannelInput} 
              value = {channelName}
            />
            <button onClick={handleAddChanneltoAddMembers}>Next</button>
            <ErrorStyle>{errorWarning ? <p>{errorText}</p> : "" }</ErrorStyle>
          </AddChannelForm>
        : "" }
        {addMemberToggle ? 
          <div>
            <AddMember
              handleAddMemberstoArray={handleGetAddMembersArray}
              channelName={channelName}
              headers={headers}
            /> 
            <button onClick={createChannel}>Add Channel with Members!</button>
          </div>
        : "" }
      </AddChannelContainer>
  </AddChannelOuterContainer>
  )
}

export default AddChannel

const AddChannelOuterContainer = styled.div`
  z-index: 2;
  margin: 0 auto;
  position: absolute;
  top: 20%;
  left: 40%;
  color: black;
`

const AddChannelContainer = styled.div`
z-index: 2;
  height: 40vh;
  width: 30vw;
  flex-direction: column;
  background-color: whitesmoke;
  font-size: 1vh;
  box-shadow: 0 1px 3px rgba(219, 219, 219, 0.9), 0 1px 2px rgba(199, 194, 194, 0.75);
  border-radius: 2vh;
  display: flex;
`
const AddChannelForm = styled.form`
margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
`

const AddChannelInput = styled.input`
  width: 100%;
  padding: 1.5vh;
  height: 2vh;
  margin: auto;
  border-radius: 2vh;
  border:1px solid black;
  font-size: 2vh;
`

const AddMemberChannelForm = styled.form`
  margin: auto;
  display: flex;
  width: 80%;
  padding: 2vh;
`

const AddMemberChannelSearch = styled.input`
  width: 100%;
  padding: 1.5vh;
  height: 2vh;
  margin: auto;
  border-radius: 2vh;
  border:1px solid black;
  font-size: 2vh;
`

const ErrorStyle = styled.div`
  > p {
    color: red;
  }
`