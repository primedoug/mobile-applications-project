import React from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import MyInput from '../components/MyInput'
import { userService } from '../services/user.service'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = React.useState('')
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passConfirm, setPassConfirm] = React.useState('')

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome inválido')
            return;
        }
        if (!login || login.trim() === '') {
            Alert.alert('Login inválido')
            return;
        }
        if (!password || password.trim() === '') {
            Alert.alert('Senha inválida')
            return;
        }
        if (password !== passConfirm) {
            Alert.alert('Senha não confere')
            return;
        }

        userService.store({
            name, username: login, password
        }).then(saved => {
            if (saved) navigation.goBack()
        }).catch(error => {
            if (error.message === 'Unauthorized') {
                navigation.navigate('Login')
            } else {
                Alert.alert(error.message)
            }
        })
    }

    return (
        <View style={styles.container}>
            <MyInput label='Nome:' onChangeText={setName} />
            <MyInput label='Login:' keyboardType='email-address' onChangeText={setLogin} />
            <MyInput label='Senha:' onChangeText={setPassword} secureTextEntry />
            <MyInput label='Confirmar Senha:' onChangeText={setPassConfirm} secureTextEntry />
            
            <Button title='Salvar' onPress={save} />
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