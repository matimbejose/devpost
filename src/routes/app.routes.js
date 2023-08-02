import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator  } from '@react-navigation/stack';

import Home from '../pages/Home'
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import PostsUser from '../pages/PostsUser';

import { AntDesign, Feather } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function StackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name="NewPost"
            component={NewPost}
            options={{
                headerTintColor: '#FFF',
                headerStyle: {
                    backgroundColor: '#36393F'
                }
            }}
            />

            <Stack.Screen 
            name="PostsUser"
            component={PostsUser}
            />


        </Stack.Navigator>
    )
}



export default function AppRoutes() {
 return (

    <Tab.Navigator
    tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
            backgroundColor: '#202225',
            borderTopWidth: 0
        },

        activeTintColor: '#FFF'
    }}
    >
        <Tab.Screen 
        name="Home" 
        component={StackScreen}
        options={{
            tabBarIcon: ( { color,size } )  => {
                return <Feather  name="home" color={color} size={size} />
            }
        }}
        />

        <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{
            tabBarIcon: ( { color,size } )  => {
                return <Feather  name="search" color={color} size={size} />
            }
        }}
        />

                
        <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
            tabBarIcon: ( { color,size } )  => {
                return <Feather  name="user" color={color} size={size} />
            }
        }}
        />

    </Tab.Navigator>


    );
}