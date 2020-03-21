import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback,
   ActivityIndicator, AsyncStorage, Keyboard, Button } from "react-native";
import Header from "../components/header";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Todo({ route, navigation }) {
  // const [todos, setTodos] = useState([
  //   { text: "buy coffee", key: "1" , checked: true},
  //   { text: "create an app", key: "2", checked: false },
  //   { text: "play on the mobile", key: "3", checked: false }
  // ]);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getData1, setData] = useState(true);

  useEffect(() => {   
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then((response) => response.json())
    .then(response => {
      setTodos(response),
      setLoading(false)
      setData(true)
    })
    .then((json) => console.log(json))
    .catch(e => {
      console.error(e)
      setData(false)
    })
    }, [])

    useEffect(() => {
      AsyncStorage.setItem('todolist', JSON.stringify(todos))
    })

    const showData = async () => {
      const value = await AsyncStorage.getItem('todolist')
      const valuep = JSON.parse(value) 
      console.log(todos);
      setTodos(valuep)
      setLoading(false)
     
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1&fbclid=IwAR3kRnDmQ1VD2u8ljkcqIBFUz7T13d5prsr4a0OF_jHEyy6WPTdLbXD2UoY")
        const data = await response.json();
        const item = data;
  
        setTodos(item)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 500)
        setGet(true)
  
      } catch (error) {
        console.log(error)
        setGet(false)
      }
    }  
    
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("Todos", JSON.stringify(todos))
        console.log(JSON.stringify(todos));
      } catch (e) {
        console.error(e)
      }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Todos')
        if(value !== null) {
          console.log(value);
        }
      } catch(e) {
        console.error(e)  
      }
    }

    const onRefresh = async () => {
      setLoading(!loading);
      return fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then((response) => response.json())
      .then((responseJson) => {
        setTodos(responseJson),
        setLoading(false) 
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  const pressHandler = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
    storeData();
    getData();
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
    storeData();
    getData();
  };

  const submitHandler = title => {
     if (title.length > 2) {
      setTodos(prevTodos => {
        return [{ title: title, id: Math.random().toString() }, ...prevTodos];
      });
      storeData();
      getData();
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
      {(loading) ?
        <ActivityIndicator size="large" color="skyblue" />
        :<View style={styles.container}>
          {getData1?
            <View></View>
            : <TouchableOpacity onPress={() => showData()}>
              <Text style={{backgroundColor:'yellow'}}>
                It seems you are offline, tap here or press Refresh when you  get connected.
              </Text>
            </TouchableOpacity>
          }
        <View style={styles.contant}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            {/* {(loading)? (
              <ActivityIndicator size="large" color="skyblue" />
            )
            :( */}
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
          {getData1?
          <Button title='Refresh' onPress={onRefresh} />:
          <Button title='Refresh' onPress={() => showData()} />
          }
        </View>       
      </View>
      }
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
