import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function MainPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    return (
        <View style={styles.container}>
            <Text style={styles.menuText}>Menu Principal</Text>
            <View style={styles.buttonContainer}><Button title="User list" onPress={() => navigation.navigate('User')} /></View>
            <View style={styles.buttonContainer}><Button title="Role list" onPress={() => navigation.navigate('Role')} /></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuText: {
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 60,
    },

    buttonContainer: {
        padding: 20,
        marginBottom: 20
    }
})