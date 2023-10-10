import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface Props extends TextInputProps {
    label: string
}

export default function MyInput(props: Props) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={styles.input} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        marginBottom: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        textAlign: 'left',
        width: Dimensions.get('screen').width - 80
    },
    input: {
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 3,
        width: Dimensions.get('screen').width - 80
    }
})