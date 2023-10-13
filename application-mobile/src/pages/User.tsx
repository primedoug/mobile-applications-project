import React from 'react'
import { Alert, Button, StyleSheet, View, Text, FlatList, Switch } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import Role from '../model/role'
import MyInput from '../components/MyInput'
import { userService } from '../services/user.service'
import { roleService } from '../services/role.service'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = React.useState('')
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passConfirm, setPassConfirm] = React.useState('')

    const [selectedRoles, setSelectedRoles] = React.useState<number[]>([]);
    const [rolesData, setRolesData] = React.useState<Role[]>([]);

    const handleRoleSelection = (roleId: any, isSelected: boolean) => {
        if (isSelected) {
            setSelectedRoles([...selectedRoles, roleId]);
        } else {
            setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
        }
    };

    function fetchRoles() {
        roleService.get().then(list => setRolesData(list))
    }

    React.useEffect(() => {
        fetchRoles()
    }, [])

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
            name, username: login, password, roles: selectedRoles
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
            <Text style={styles.menuText}>Cadastrar User</Text>

            <MyInput label='Nome:' onChangeText={setName} />
            <MyInput label='Login:' keyboardType='email-address' onChangeText={setLogin} />
            <MyInput label='Senha:' onChangeText={setPassword} secureTextEntry />
            <MyInput label='Confirmar Senha:' onChangeText={setPassConfirm} secureTextEntry />

            <Text>Selecione Funções:</Text>
            <FlatList
                data={rolesData}
                keyExtractor={(item) => (item.id ? item.id.toString() : 'defaultKey')}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Switch
                            value={selectedRoles.includes(item.id || 0)} 
                            onValueChange={(newValue) => handleRoleSelection(item.id, newValue)}
                        />
                    </View>
                )}
            />
            
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
    },

    menuText: {
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 60,
    }
})