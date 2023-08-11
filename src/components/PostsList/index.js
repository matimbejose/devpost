import React from 'react';
import { Container,Header, Avatar, Name,ContentView,Content, Actions, LikeButton,Like, TimePost} from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import  firestore  from '@react-native-firebase/firestore';
import { useNavigation  } from '@react-navigation/native';


export default function PostsList({ data, userId }) {
    const navigation = useNavigation();

    function formatTimePost() {
        //convertendo  timespanp  para data
      const datePost  = new Date(data.created.seconds*1000)


      return formatDistance(
        new Date(),
        datePost, {
            locale:ptBR
        }
      )

    }
    async function likePost(id, likes){
        const docId = `${userId}_${id}`;

        //Checar se o post já foi curtido
        like: likes - 1
        const doc = await firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists){
            //Quer dizer que ele já curtiu esse post
            await firestore().collection('posts')
            .doc(id).update({
            })

            await firestore().collection('likes')
            .doc(docId).delete();
            return;
        }

        //Criar o like dele no post
        await firestore().collection('likes')
        .doc(docId).set({
            postId: id,
            userId: userId, 
        })

        //Somar + 1 like no post
        await firestore().collection('posts')
        .doc(id).update({
            like: likes + 1
        });



    }


 return (
    <Container>
        <Header onPress={ () => navigation.navigate("PostsUser", { title: data.autor , userId: data.userId}) }>

            {
                data.avatarUrl ? 
                (
                    <Avatar
                     source={{ uri:  data.avatarUrl }}
                     />

                ) : (
                    <Avatar 
                    source={require('../../assets/avatar.png')}
                    />
                )
            }

            <Name>{ data?.autor }</Name>
        </Header>

        <ContentView>
            <Content>{ data?.content} </Content>
        </ContentView>

        <Actions>
            <LikeButton onPress={ () => likePost(data.id, data.like) } >
                <Like>{data?.like === 0 ? '': data?.like }</Like>
                <MaterialCommunityIcons
                 name={ data?.like === 0  ? "heart-plus-outline": "cards-heart"}
                 size={20}
                 color="#e52246"
                 />
            </LikeButton>

            <TimePost>
                { formatTimePost() }
            </TimePost>

        </Actions>


    </Container>
  );
}