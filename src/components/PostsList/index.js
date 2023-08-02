import React from 'react';
import { Container,Header, Avatar, Name,ContentView,Content, Actions, LikeButton,Like, TimePost} from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import  firestore  from '@react-native-firebase/firestore';

export default function PostsList({ data, userId }) {

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

    async function likePost(id, like){
        const docId = `${userId}_${id}`;

        //verificando se o post foi curtido para  deletar like
        const doc = await  firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists) {
             await firestore().collection('posts')
             .doc(id).update({
                like: like -1,
             })

             await firestore().collection('likes')
             .doc(docId).delete();
             return
        }

        //para colocar linke
        await firestore().collection('likes')
        .doc(docId).set({
            postId: id,
            userId: userId,
        })

        //somando mais um like no post 
        await firestore().collection('posts')
        .doc(id).update({
            like: like + 1
        })
    }

 return (
    <Container>
        <Header>

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