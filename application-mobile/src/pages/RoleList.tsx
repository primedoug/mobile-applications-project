import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import Role from '../model/role'
import MyRole from '../components/MyRole'
import { roleService } from '../services/role.service'

export default function RoleList() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [ roles, setRoles ] = React.useState<Role[]>()

    navigation.setOptions({
        headerLeft: () => <Button title="Voltar" onPress={() => navigation.goBack()} />,
        headerRight: () => <Button title="Adicionar" onPress={() => navigation.navigate('Role')} />

    })

    function fetchRoles() {
        roleService.get().then(list => setRoles(list))
    }

    function goToEdit(role: Role) {
        navigation.navigate('Role', { role: role })
    }

    React.useEffect(() => {
        fetchRoles()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={roles}
                refreshing={false}
                onRefresh={fetchRoles}
                renderItem={elem => <MyRole role={elem.item} onTouchItem={goToEdit} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
})