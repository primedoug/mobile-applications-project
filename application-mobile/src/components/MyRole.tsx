import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"

import Role from "../model/role"

type Props = { role: Role, onTouchItem: (role: Role) => void }

export default function MyRole({ role, onTouchItem }: Props) {
    return (
        <View style={styles.container} onTouchEnd={() => onTouchItem(role)}>
            <Text style={styles.nameText}>{role.name}</Text>
            <Text style={styles.descriptionText}>{role.description}</Text>
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
    descriptionText: {
        fontSize: 14,
    },
})