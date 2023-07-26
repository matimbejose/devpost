import React, { useState, useContext } from 'react';
import { View,Text, ActivityIndicator } from 'react-native';
import { Container,Input,Title,Button,ButtonText, SignUpButton, SignUpText } from './styles'

import {  AuthContext } from '../../contexts/auth';



export default function Login() {
const [login, setLogin] = useState(false)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const { signIn,signUp,loadingAuth } = useContext(AuthContext);
 

function toggleLogin() {
  setLogin(!login);
  setName('')
  setPassword('')
  setEmail('')
}

function handleLogin() {
  if( email == '' || password == '') {
    console.log("Preecha todos os dados")
    return;
  }

  signIn(email, password);
}


function handleSignUp() {
  if(name == '' || email == '' || password == '') {
    console.log("Preecha todos os dados")
    return;
  }


  signUp(email, password, name);
}

  if(login) {
    return(
    <Container>
      <Title>
        Dev
        <Text style={{ color: '#e52246'}}>Post</Text>
        </Title>

        <Input 
        placeholder="email@email.com"
        value={ email }
        onChangeText={ (text) => setEmail(text) }
        />

        <Input
        placeholder="*******"
        secureTextEntry={true}
        value={ password }
        onChangeText={ (text) => setPassword(text) }
        />


        <Button onPress={  handleLogin }>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#FFF"/>
            ) : (
              <ButtonText>Acessar</ButtonText>
            )
          }
        </Button>

        <SignUpButton onPress={ () => toggleLogin() }>
          <SignUpText>Criar uma conta.</SignUpText>
        </SignUpButton>

    </Container>   
    )
  }

 return (
  <Container>
  <Title>
    Dev
    <Text style={{ color: '#e52246'}}>Post</Text>
    </Title>


    <Input 
    placeholder="Nome"
    value={ name }
    onChangeText={ (text) => setName(text) }
    />

    <Input 
    placeholder="email@email.com"
    value={ email }
    onChangeText={ (text) => setEmail(text) }
    />

    <Input
    placeholder="*******"
    secureTextEntry={true}
    value={ password }
    onChangeText={ (text) => setPassword(text) }
    />


    <Button onPress={ handleSignUp } >
      {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#FFF"/>
            ) : (
              <ButtonText>Cadastrar</ButtonText>
              )
          }
    </Button>

    <SignUpButton onPress={ () => toggleLogin()} >
      <SignUpText>Ja tenho uma conta.</SignUpText>
    </SignUpButton>

  </Container>   

);

}