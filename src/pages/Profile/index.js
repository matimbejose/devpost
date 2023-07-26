import React, { useContext } from 'react';
import { View,Text,Button } from 'react-native';

import { AuthContext  } from '../../contexts/auth';


export default function Profile() {

  const { signOut } = useContext(AuthContext);
  
 return (

    <View>
        <Text>Pagina Profile</Text>
        <Button onPress={ () => signOut() } title='Sair' />
    </View>
  );
}