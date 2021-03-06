import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../src/screens/Login';
import Register from '../src/screens/Register';

const RootStack = createStackNavigator();

const RootScreens = () => ( 
    <RootStack.Navigator headerMode = "none">
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Register" component={Register}/>

    </RootStack.Navigator>
);


export default RootScreens;