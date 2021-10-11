import React, { useEffect, useState } from "react";
import styled from 'styled-components'


function AddMemberChannel({ headers, handleToggleAddChannel}) {
    const [toggleSearchMember, setToggleSearchMember] = useState(false)

// const handleToggleSearchMember = () => {
//     handleToggleAddChannel()
//     setToggleSearchMember (!toggleSearchMember)
// }
    return (
    <AddMemberChannelOuterContainer>
        <AddMemberChannelContainer>
            <h1>Add Members to your channel</h1>
            <AddMemberChannelForm >
                <AddMemberChannelSearch/>
            </AddMemberChannelForm>
        </AddMemberChannelContainer>
    </AddMemberChannelOuterContainer>
    )
}

export default AddMemberChannel

const AddMemberChannelOuterContainer = styled.div`
z-index: 1;
margin: 0 auto;
position: absolute;
top: 20%;
left: 40%;
`

const AddMemberChannelContainer = styled.div`
z-index: 2;
height: 40vh;
width: 30vw;
background-color: whitesmoke;
font-size: 1vh;
padding: 1vh;
box-shadow: 0 1px 3px rgba(219, 219, 219, 0.9), 0 1px 2px rgba(199, 194, 194, 0.75);
border-radius: 2vh;
>h1{
    color: black;
}
`
const AddMemberChannelForm = styled.form`
margin: auto;
display: flex;
width: 80%;
padding: 2vh;
`

const AddMemberChannelSearch = styled.input`
width: 100%;
padding: 1vh;
height: 4vh;
margin: auto;
border-radius: 2vh;
border:1px solid black;
font-size: 1.5vh;
background-color: white;
`