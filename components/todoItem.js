import React from 'react';
import { StyleSheet, Text,  View, TouchableOpacity, Button, CheckBox} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function TodoItem({ item, pressHandler, pressHandler1, onCheck, edit, navigation }) {


    return(
        <TouchableOpacity onPress={() => pressHandler1(item, edit)}>            
            <View style={styles.item}> 
            <TouchableOpacity onPress={() => pressHandler(item.id)}>
                    <MaterialIcons name='delete' size={18} color='#333'/>               
                </TouchableOpacity>
                <View style={styles.itemText}> 
                    <Text style={Boolean(item.completed)&&{textDecorationLine: "line-through"}}>
                        {item.title} </Text>                       
                </View>
                <CheckBox value={item.completed} onChange={() => onCheck(item.id)} />
                {/* <Text style={styles.itemText}>{item.text}</Text> */}                
            </View>  
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginTop: 12,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    itemText: {
        marginLeft: 10,   
        width: 180, 
    },
})