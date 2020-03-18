import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Button, Keyboard } from "react-native";
import TodoItem from "../components/todoItem";

  export default function ReviewDetails({ navigation }) {
    const [title, setText] = useState("");

  const changeHandler = val => {
    setText(navigation.getParam('item').title + val);
  };

  const edi = navigation.getParam('edit');

  // const submitHandler = (id, title) => {   
  //   if (text.length > 3) {
  //     todo = route.params;
  //     todo.text = text;
  //     navigation.setParams(todo);
  //     navigation.goBack();
  //     // setTodos(prevTodos => {
  //     //   return[{ title: title, id: Math.random().toString() }, ...prevTodos];
  //     // });
  //   } else {
  //     Alert.alert("OOPS!", "Todos must over 3 chars long", [
  //       { text: "Understood", onPress: () => console.log("alert closed") }
  //     ]);
  //   }
  // };

  // const pressHandler = () => {
  //   submitHandler(title);
  //   setText('');
  // }

      return (
          <View style={styles.detail}>
            <View style={styles.contant}>
                <TextInput style={styles.input} 
                onChangeText={changeHandler}
                defaultValue={navigation.getParam('item').title }
                />
                <Button onPress={() => edi(navigation.getParam('item').id, title)}
                 title='done' color='skyblue' />             
          </View>
        </View>
      )
  }

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      padding: 10,
    },
    contant: {
        padding: 40,
        // backgroundColor: "#666",
        flex: 1
    },
    list: {
        marginTop: 28,
        flex: 1 
    
      },
})   