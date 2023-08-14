import React, { useContext, useState } from 'react';
import { AuthContext  } from '../../contexts/auth';
import { Container, UploadButton, UpLoadText, Avatar,Name,Email,Button,ButtonText,ModalContainer,ButtonBack,Input} from './styles'
import { AntDesign } from '@expo/vector-icons'; 
import { Modal, Platform } from 'react-native';
import Header from '../../components/Header';
import  firebase  from '@react-native-firebase/firestore';
import  storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker'

export default function Profile() {
  const { signOut, user, storageUser, setUser} = useContext(AuthContext);
  const [url, setUrl] =  useState(null);
  const [open, setOpen] = useState(null);
  const [nome, setNome] = useState(user?.nome)



  //update profile
  async function updateProfile() {
    if(nome === '')
      return;

    await firebase().collection('users')
    .doc(user.uid).update({
      nome: nome
    })


    //find the user post
    const postDocs = await firebase().collection('posts')
      .where('userId', '==', user.uid).get();


    postDocs.forEach(async doc => {
      await firebase().collection('posts').doc(doc.id).update({
        autor: nome
      })
    })

    let data = {
      uid: user.uid,
      nome:nome,
      email: user.email
    };

    storageUser(data);
    setUser(data);
    setOpen(false);
  }

  
  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log(response);
      console.log(options);
      if(response.didCancel){
        console.log('CANCELOU O MODAL.');
      }else if(response.error){
        console.log('Parece que deu algum erro: ' + response.error);
      }else{

        uploadFileFirebase(response);
        setUrl(response.uri);

      }

    })
  }

  // const checkPermissionsAndUpload = async () => {
  //   const { status } = await PermissionsAndroid.askAsync(PermissionsAndroid.MEDIA_LIBRARY);
  
  //   if (status === 'granted') {
  //     // Permissão concedida, agora você pode chamar o uploadFile
  //     uploadFile();
  //   } else {
  //     // Permissão não concedida
  //     console.log('Permissão para acessar a galeria foi negada.');
  //   }
  // };
  
  



  const getFileLocalPath = response => {
    const {path, uri}  = response;
    return Platform.OS === 'android' ? path : uri;
  }

  const uploadFileFirebase = async response  => {
    const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref('users').child(user?.uid)
    return await storageRef.putFile(fileSource);
  };


 return (

    <Container>

      <Header />

      {
        url ? 
        (
          <UploadButton onPress={ uploadFile }>
            <UpLoadText>+</UpLoadText>
            <Avatar 
            source={{ uri: url}}
            />
          </UploadButton>
        ): 
        (
          <UploadButton onPress={ uploadFile }>
            <UpLoadText>+</UpLoadText>
          </UploadButton>
        )
      }


      <Name numberOflines={1}>{ user.nome}</Name>
      <Email numberOflines={1}>{ user.email }</Email>


      <Button bg="#428cfd" onPress={ () => setOpen(true) }>
        <ButtonText color="#FFF">Atualizar perfil</ButtonText>
      </Button>

      <Button bg="#FFF" onPress={ () => signOut()}>
        <ButtonText color="#3b3b3b">Sair</ButtonText>
      </Button>


      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={ Platform.OS =='android' ?  '': 'padding' }>
          <ButtonBack onPress={ () => setOpen(false) }>
          <AntDesign 
            name="arrowleft" 
            size={22} 
            color="#121212"
            />
          <ButtonText color="#121212">Voltar</ButtonText>
            </ButtonBack>


            <Input
             placeholder={user?.nome}
             value={nome}
             onChangeText={ (text) => setNome(text) }
             />

        <Button bg="#428cfd" onPress={  updateProfile }>
            <ButtonText color="#f1f1f1">Atualizar</ButtonText>
        </Button>

        </ModalContainer>
      </Modal>

    </Container>
  );
}