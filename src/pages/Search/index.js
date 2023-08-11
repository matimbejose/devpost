import React, { useState, useEffect } from 'react';
import  firestore  from '@react-native-firebase/firestore';
import { Container,AreaInput,Input,List} from './styles';
import { Feather } from '@expo/vector-icons'; 
import SearchList from '../../components/SearchList';

export default function Search() {
  const [input, setInput] = useState();
  const [users, setUsers] = useState([])


  useEffect(() => {

    if(input === '' || input === undefined) {
      setUsers([])
      return;
    }

    const subscriber = firestore().collection('users')
    .where('nome', '>=', input)
    .where('nome', '<=', input + "\uf8ff")
    .onSnapshot( snapshot => {
      const listsUsers = [];

      snapshot.forEach( doc => {
        listsUsers.push({
          ...doc.data(),
          id: doc.id
        })

      })

      setUsers(listsUsers);


    })

    return () => subscriber()
    
  }, [input])


 return (

    <Container>
      <AreaInput>

      <Feather 
        name="search"
        color="#e52246"
        size={20}
      />

      <Input 
        placeholder="Procure alguem?"
        placeholderTextColor="#353840"
        value={input}
        onChangeText={ (text) =>  setInput(text)}
      />

      </AreaInput>

      <List 
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={ (item) => item.id }
        renderItem={ ( {item} ) =>  <SearchList data={item} />}
      />


    </Container>
  );
}