import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
//import { doc, setDoc } from "firebase/firestore/lite";
//import firebase from '@react-native-firebase/app'
//import '@react-native-firebase/auth'
import {auth, db} from "./Firebase"



// To successfully register, or sign up, you need a properly typed email and password containing at least 6 characters, that is part of Firebase initial setup


const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [shortPassword, setShortPassword] = useState<boolean>(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showWarningPasswordMessage, setShowWarningPasswordMessage] = useState<boolean>(false);
    const [showUnmatchedPassword, setUnmatchedPassword] = useState<boolean>(false);

    const handleSignUp = async () => {
        try {
          const emailRegex: RegExp = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
          console.log("Email wrong format")

          if (emailRegex.test(email) && password.length > 5  && password === password2)  {              
                  const user = await createUserWithEmailAndPassword(auth, email, password)
                  Alert.alert('Registrering lyckades', `Välkommen, ${email}!`);
                  setShowSuccessMessage(true)           
                  console.log("user registered successfully");

                } else if(password !== password2) {
                  Alert.alert('password and password2 does not match,')
                  setUnmatchedPassword(true)
                  console.log("Error")  

                } else if(password.length < 6) {
                  Alert.alert('password is to short')
                  setShortPassword(true)
                  console.log("Error length")

                } else if(!emailRegex.test(email)) {
                  Alert.alert('email wrong format')
                  
                }         
                                        
          } catch (error: any) {
          Alert.alert('Error', error.message);
          setShowWarningPasswordMessage(true)
          console.log("Error registering user: ", error.message)
          // this creates a new user with email and password using the auth configuration
          //notifying that the registration was successful         
          }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign up</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                
            />

            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="confirm password"
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry
            />

            <Button mode="contained" onPress={handleSignUp} style={styles.loginButton}>
                Submit
            </Button>

            <Snackbar style={styles.snackbar}
                visible={showSuccessMessage}
                onDismiss={() => setShowSuccessMessage(false)}
                duration={Snackbar.DURATION_SHORT}>
                    <Text>Registrerad, {email}!</Text>

            </Snackbar>

            <Snackbar style={styles.input}
                visible={showWarningPasswordMessage}
                onDismiss={() => setShowWarningPasswordMessage(false)}
                duration={Snackbar.DURATION_SHORT}>
                     <Text>Måste ange användarnamn och lösenord</Text>

            </Snackbar>

            <Snackbar style={styles.input}
                visible={showUnmatchedPassword}
                onDismiss={() => setUnmatchedPassword(false)}
                duration={Snackbar.DURATION_SHORT}>
                     <Text>Lösenord stämmer ej överens</Text>

            </Snackbar>

            
        </View>
    )

    

}

export default SignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 10,
    },
    loginButton: {
      marginTop: 20,
      width: '100%',
      padding: 10,
    },
    snackbar: {

        backgroundColor: 'white'
    }
  });