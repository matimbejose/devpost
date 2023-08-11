import styled from "styled-components";

export const Container = styled.View`
flex: 1;
align-items: center;
background-color: #353840;
`

export const  UploadButton = styled.TouchableOpacity`
margin-top: 20%;
background-color: #fff;
width: 165px;
height: 165px;
border-radius: 90px;
justify-content: center;
align-items: center;
z-index: 5;
`

export const UpLoadText = styled.Text`
z-index: 9;
position: absolute;
font-size: 55px;
color: #e52246;
opacity: 0.4;
`

export  const Avatar = styled.Image`
width: 160px;
height: 160px;
border-radius: 80px;
opacity: 0.9;
`
export  const  Name = styled.Text`
margin-top: 20px;
margin-left: 20px;
margin-right: 20px;
font-size: 28px;
color: #FFF;
font-weight: bold;
`
export const Email = styled.Text`
margin-top: 9px;
margin-left: 20px;
margin-right: 20px;
color: #DDD;
font-style: italic;
font-size: 20px;
margin-bottom: 10px;
`

export const Button = styled.TouchableOpacity`
margin-top: 12px;
align-items: center;
justify-content: center;
background-color: ${ props => props.bg};
width: 80%;
height: 45px;
border-radius: 5px;
`

export const ButtonText = styled.Text`
font-size: 20px;
color: ${props => props.color};
font-style: italic;
`
export  const ModalContainer = styled.View`
width: 100%;
height: 70%;
background-color: #FFF;
justify-content: center;
align-items: center;
position: absolute;
bottom: 0;
`
export const ButtonBack  = styled.TouchableOpacity`
position: absolute;
top: 15px;
left: 25px;
flex-direction: row;
align-items: center;
`

export const Input =  styled.TextInput`
width: 90%;
height: 50px;
background-color: #DDD;
border-radius: 10px;
padding: 10px;
font-size: 20px;
text-align: center;
`