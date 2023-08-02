import React, { useState,useLayoutEffect,useContext } from 'react';
import { Container,Input, Button,ButtonText} from './styles'
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import {  AuthContext } from '../../contexts/auth';


export default function NewPost() {
  const navigation = useNavigation();
  const [post, setPost] = useState('');
  const  { user } = useContext(AuthContext);

  useLayoutEffect(()=> {

    const options = navigation.setOptions({
      headerRight:() => (
        <Button onPress={()=>  handlePost() }>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [ navigation, post])


  async function handlePost() {
    if(post == '') {
      console.log("seu posta eh invalido");
      return;
    }

    let avatarUrl = null;

    try {
      
      //verificando  ha fotos para o usuario 
      let reponse = await storage().ref('users').child(user?.uid).getDownloadURL()

      avatarUrl = reponse;

    } catch (err) {
      avatarUrl = null;
    }

    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      autor: user.nome,
      like: 0,
      avatarUrl,
      userId: user.uid,
    })
    .then(() => {
      setPost('')
      
      console.log("Post criado com sucesso")
    })
    .catch((error) => {
      console.log(error)
    })

    navigation.goBack()
  }

 return (
    <Container>

      <Input 
      placeholder="O que esta acontecendo?"
      placeholderTextColor="#DDD"
      multiline={true}
      maxLength={300}
      value={post}
      onChangeText={ (text) => setPost(text)}
      autoCorrect={false}
      />
    </Container>
  );
}