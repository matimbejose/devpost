import React, { useContext } from 'react';
import { View,ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'



export default function Routes() {
    const { signed,loading } = useContext(AuthContext);


    console.log(loading);

    if(loading) {
      return(
        <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor:'#36393F'
        }}
        >

            <ActivityIndicator  size={50} color="#e52246"/>
        </View>
      );

    }

 return (
    signed ? <AppRoutes /> : <AuthRoutes />
  );
}