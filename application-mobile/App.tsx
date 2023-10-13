import React from 'react';
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import MainPage from './src/pages/Main'

import UserPage from './src/pages/User'
import RolePage from './src/pages/Role'

import UserList from './src/pages/UserList'
import RoleList from './src/pages/RoleList'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Acesso' }} />

                <Stack.Screen name="Main" component={MainPage} options={{ title: 'Página Inicial' }} />
                <Stack.Screen name="User" component={UserPage} />
                <Stack.Screen name="Role" component={RolePage} />
                
                <Stack.Screen name="UserList" component={UserList} options={{ title: ' Lista de Users' }} />
                <Stack.Screen name="RoleList" component={RoleList} options={{ title: ' Lista de Roles' }} />   
            </Stack.Navigator>
        </NavigationContainer>
    )
}
