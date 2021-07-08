import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Todo from '../screens/todo';
import ReviewDetails from '../screens/reviewDetails';
import Header from '../components/header';
import React from 'react';

const screens = {
    Todo: {
        screen: Todo,
        navigationOptions: {
            headerTitle: () => <Header />,
        } 
    },
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: {
            title: 'ToDo Details',
        } 
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: 'skyblue', height: 90,  }
    }
}, {
    initialRouteName: 'ReviewDetails',
  });

export default createAppContainer(HomeStack); 