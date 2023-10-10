import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Alert, Button, StyleSheet, View } from 'react-native'

import MyInput from '../components/MyInput'
import { authService } from '../services/auth.service'

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function signIn() {
        const isLogged = await authService.login(login, password)
        if (isLogged) {
            navigation.navigate('Home')
        } else {
            Alert.alert('Login ou senha inválido(a)!')
        }
    }

    return (
        <View style={styles.container}>
            <MyInput label='Login:' keyboardType='email-address' onChangeText={setLogin} />
            <MyInput label='Senha:' onChangeText={setPassword} secureTextEntry />
            
            <Button title='Entrar' onPress={signIn} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
})
