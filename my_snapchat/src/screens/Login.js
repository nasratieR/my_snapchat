import * as React from 'react';
import { useRef, useState } from "react";
import { Button, View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function ConnectionScreen() {
    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
  
    function handleSubmitConnect(e) {
        const navigation = useNavigation()
        console.log(email, password);
      e.preventDefault()
      fetch('http://snapi.epitech.eu:8000/connection', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          email: email.email,
          password: password.password
        })
      }).then(async (res) => {
        let response = await res.json()
        if (res.status != 200) {
          console.log(response, "Error message")
        } else {
            navigation.navigate('Accueil')
          console.log(response)

        }

      })

    };
        
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Connection</Text>
        <View>
          <Text>Email</Text>
          <TextInput
            name='email' placeholder="Email"
            email={(email) => setEmail({ email })}
          /*value={email}*/
          />
        </View>
        <View>
          <Text >Password</Text>
          <TextInput
            secureTextEntry={true} name='password' placeholder="Password"
            password={(password) => setPassword({ password })}
          // value={password}
          />
        </View>
        <View >
          <Button
            title="Connection" onPress={handleSubmitConnect}
          />
        </View>
  
      </View>
    );
  }