import React, { createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});


export default function AuthProvider( { children } ) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)

  useEffect(() => {
    async  function loadStorege() {
      const storageUser = await AsyncStorage.getItem('devApp')

      if(storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(true)
      }
      setLoading(false)
    }


    loadStorege()
  }, [])


  async  function signIn(email, password) {
    setLoadingAuth(true)

    await auth().signInWithEmailAndPassword(email, password) 
      .then(async(value) => {
        let uid = value.user.uid;
        //find name user

        const userProfile = await firestore().collection('users')
          .doc(uid).get()

          console.log(userProfile.data().nome)

          let data = {
            uid: uid,
            nome: userProfile.data().nome,
            email: value.user.email,
          }

          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
      })
      .catch((error) => {
        console.log(error)
        setLoadingAuth(false)
      })

    }


  async function signUp(email, password, name) {
    setLoadingAuth(true)

    await auth().createUserWithEmailAndPassword(email, password)
      .then( async(value) => {
        let uid = value.user.uid;
        await firestore().collection('users')
        .doc(uid).set({
          nome: name
        })
        .then(()=> {

          let data = {
            uid: uid,
            nome: name,
            email: value.user.email
          };

          setUser(data)
          storageUser(data)
          setLoadingAuth(false)

        })
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false)
      })
  }


  async function storageUser(data) {
    await AsyncStorage.setItem('devApp', JSON.stringify(data))
  }


  async function signOut() {
    await auth().signOut();
    await AsyncStorage.clear()
      .then(()=> {
        setUser(null);
      })
  }

 return (

    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signUp,
      signIn,
      signOut,
      loadingAuth,
      loading,
      storageUser,
      setUser
    }}
    >
        { children }
    </AuthContext.Provider >


  );
}