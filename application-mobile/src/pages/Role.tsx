import React from 'react'
import { Alert, Button, StyleSheet, View, Text } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import MyInput from '../components/MyInput'
import { roleService } from '../services/role.service'

export default function RolePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [ name, setName ] = React.useState('')
    const [ description, setDescription ] = React.useState('')

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome inválido')
            return;
        }
        if (!description || description.trim() === '') {
            Alert.alert('Descrição inválida')
            return;
        }

        roleService.store({
            name, description
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
            <Text style={styles.menuText}>Cadastrar Role</Text>
            <MyInput label='Nome:' onChangeText={setName} />
            <MyInput label='Descrição:' onChangeText={setDescription} />
            
            <Button title='Salvar' onPress={save} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    menuText: {
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 60,
    }
})