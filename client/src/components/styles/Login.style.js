import styled from "styled-components";

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    > img{
        object-fit: contain;
        height: 100px;
        margin-bottom: 10px;
    }
    > h1{
    object-fit: contain;
    height: 100px;
    margin-bottom: 10px;
    }
`;


const Form = styled.form`
    display: flex;
    flex-direction: column;

>input{
    padding: 1vh;
    margin: 1vh;
    min-width: 25vw;
}
>input[type=submit]{
    padding: 1vh;
    margin: 1vh;
    min-width: 25vw;
    color: white;
    font-weight: bolder;
    background-color: #5D2D5D;
    font-family: 'Noto Sans', sans-serif;
}
`;


export { 
    LoginContainer,
    LoginInnerContainer,
    Form,
}