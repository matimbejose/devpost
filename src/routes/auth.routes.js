import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login'

const Stack = createStackNavigator();


export default function AuthRoutes() {
     return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />            
        </Stack.Navigator>
    );
}