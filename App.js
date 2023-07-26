import 'react-native-gesture-handler'
import { StyleSheet, Text, View,LogBox } from 'react-native';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreAllLogs();

import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/auth'; 



export default function App() {
  return (
    <NavigationContainer>

      <AuthProvider>
      <StatusBar backgroundColor="#36393F" barStyle="light-content" translucent={false} />      
      <Routes />        
      </AuthProvider>
      
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
