import * as React from 'react';
import { useRef, useState } from "react";
import { Button, View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function InscriptionScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    console.log(email.email);
    console.log(password.password);
    e.preventDefault()
    fetch('http://snapi.epitech.eu:8000/inscription', {
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
        console.log(response, navigation.navigate('Connection'))
      }
    })
  }
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Inscription!</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          name='email' placeholder="Email"
          onChangeText={(email) => setEmail({ email })}
        />
      </View>
      <View>
        <Text >Password</Text>
        <TextInput
          secureTextEntry={true} name='password' placeholder="Password"
          onChangeText={(password) => setPassword({ password })}
        />
      </View>
      <View >
        <Button
          title="Inscription" onPress={handleSubmit}
        />
      <Button
      title="Connection"
      onPress={() => navigation.navigate('Connection')}
    />
      </View>

    </View>
  );
};
