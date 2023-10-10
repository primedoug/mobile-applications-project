import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import MyItem from '../components/MyItem'
import { userService } from '../services/user.service'
import { User } from '../model/user'

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [ users, setUsers ] = React.useState<User[]>()

    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={() => navigation.goBack()} />,
        headerRight: () => <Button title="Add" onPress={() => navigation.navigate('User')} />
    })

    function fetchUsers() {
        userService.get().then(list => setUsers(list))
    }

    function goToEdit(user: User) {
        navigation.navigate('User', { user: user })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                refreshing={false}
                onRefresh={fetchUsers}
                renderItem={elem => <MyItem user={elem.item} onTouchItem={goToEdit} />}
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