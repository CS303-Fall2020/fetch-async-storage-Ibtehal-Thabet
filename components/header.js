import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Header() {
    return(
        <View style={styles.header}>
            <View>
            <Text style={styles.title}>TodoList</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: 350,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
    },
    title: {
        textAlign: 'center',       
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 1,
    }
});