import { Dimensions, StyleSheet, Text, View } from "react-native"

import { User } from "../model/user"

type Props = { user: User, onTouchItem: (user: User) => void }

export default function MyItem({ user, onTouchItem }: Props) {
    return (
        <View style={styles.container} onTouchEnd={() => onTouchItem(user)}>
            <Text style={styles.nameText}>{user.name}</Text>
            <Text style={styles.usernameText}>{user.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 40,
    },
    nameText: {
        fontSize: 18,
    },
    usernameText: {
        fontSize: 14,
    },
})