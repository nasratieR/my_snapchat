import * as React from 'react';
import { useRef, useState } from "react";
import { Button, View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigationstack';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Inscription"
        onPress={() => navigation.navigate('Inscription')}
      />
      <Button
        title="Connection"
        onPress={() => navigation.navigate('Connection')}
      />
    </View>
  );
}

function InscriptionScreen() {
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
}



function ConnectionScreen() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  function handleSubmitConnect(e) {
    /* console.error("in");*/
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
        // navigation.push('Accueil', {token: response.data.token})
        navigation.navigate('Accueil', {token: response.data.token})
        console.log(response)
      }
    })
  };
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Connection</Text>
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
          title="Connection" onPress={handleSubmitConnect}
        />
      </View>

    </View>
  );
}

function Accueil({route, navigation}) {
  const {token} = route.params
  console.log(token, 'token');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome in my_snap!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" options={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="Accueil" component={Accueil} options={({ route }) => ({ title: route.params?.token || "DEFAULT TITLE" })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



/*export default function App() {
  return (

    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require('./assets/snapicone.png')} />
      
      <Button title="CONNEXION" color="#f21c0d" onPress={() => navigation.navigate('Login')}/>
      <Button title="INSCRIPTION"  onPress={() => navigation.navigate('Register')}/>
    </View>
  );
}

function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFD700', }}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Button title="CONNEXION" color="#f21c0d" onPresss={() => Linking.openURL('snapi.epitech.eu:8000')}/>
      <Button title="INSCRIPTION" />
      <NavigationContainer>{}</NavigationContainer>
    </View>

  );
}
function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFD700', }}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
        <TouchableOpacity style={styles.loginBtn}
        onPress ={() => fetch('http://snapi.epitech.eu:8000/inscription', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password
                  })
                })
                }>
        <Text>INSCRIPTION</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingBottom: 10,
    justifyContent: "flex-end",
  },
  tinyLogo: {
    marginLeft: 150,
    marginBottom: 450,
    width: 100,
    height: 100,
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#13A3FC",
  },
});
*/
