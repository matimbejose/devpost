import React,{ useLayoutEffect, useState, useEffect, useContext } from 'react';
import { View,Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { Container,ListPosts  } from './styles';
import PostsList from '../../components/PostsList';
import { AuthContext } from '../../contexts/auth';

export default function PostsUser({ route }) {
const navigation  = useNavigation();
const [ title , setTitle] = useState(route.params.title);
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(true);
const { user } = useContext(AuthContext);


  useLayoutEffect(() => {

    navigation.setOptions({
      title: title === '' ? '' : title
    })

  }, [navigation. title])

   useEffect(() => {
    

    const subscriber = firestore().collection('posts')
      .where('userId', '==', route.params.userId)
      .orderBy('created', 'desc')
      .onSnapshot( snapshot => {
        const postList = [];

        snapshot.forEach( doc => {
          postList.push({
            ...doc.data(),
            id: doc.id
          })
        })

        setPosts(postList)
        setLoading(false);

      })

      return () => subscriber();

   }, [])


 return (

    <Container>
      {
        loading ? 
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={50} color="#E52246" />
          </View>
        ) : (
          <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={ ({ item }) => <PostsList data={item} userId={ user.uid } />}
          />
        )
      }
    </Container>
  );
}