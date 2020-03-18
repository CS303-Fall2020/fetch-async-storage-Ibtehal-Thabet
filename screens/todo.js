import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, RefreshControl, ActivityIndicator, AsyncStorage, Keyboard, Button } from "react-native";
import Header from "../components/header";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Todo({ route, navigation }) {
  // const [todos, setTodos] = useState([
  //   { text: "buy coffee", key: "1" , checked: true},
  //   { text: "create an app", key: "2", checked: false },
  //   { text: "play on the mobile", key: "3", checked: false }
  // ]);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(loading);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then((response) => response.json())
    .then(response => {
      setTodos(response),
      setLoading(false) 
    })
    .then((json) => console.log(json))
    .catch(e => {
      console.error(e)
    })
    }, [])
    
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
  
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

  const pressHandler = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
  };
  const pressHandler1 = item => {
    navigation.navigate('ReviewDetails', {item, edit});
    //navigation.push('ReviewDetails');
  }

  const onCheck = id => { 
    setTodos(prevTodos => {
      return prevTodos.filter(todo => {
        if((todo.id != id) == false) {
          todo.completed = !todo.completed;
        }
        return true;
      });
    });
  };

  const submitHandler = title => {
     if (title.length > 2) {
      setTodos(prevTodos => {
        return [{ title: title, id: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS!", "Todos must over 2 chars long", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    }
  };
 
  const edit = (id, title) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => {
        if((todo.id != id) == false) {
          todo.title = title;
      }
        return true;
      });
    })
    navigation.navigate('Todo')
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}>
      <View style={styles.container}>
        <View style={styles.contant}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                // <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                <TodoItem item={item} pressHandler={pressHandler} pressHandler1={pressHandler1}
                 onCheck={onCheck} edit={edit} />
                // </TouchableOpacity>
              )}
            />
          </View>
          <Button title='Refresh' onPress={(onRefresh)}>
          </Button>
        </View>       
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contant: {
    padding: 30,
    // backgroundColor: "#666",
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,

  }
});
