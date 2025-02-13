import React, { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { auth } from "./Firebase";


type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showWarningPasswordMessage, setShowWarningPasswordMessage] = useState<boolean>(false);
    const [x, setX] = useState<boolean>(false);

    const handleSignUp = async () => {

        try {

            //const auth = firebase.auth()
            
            //const user = await auth.createUserWithEmailAndPassword(email, password)
            //user.additionalUserInfo
            //console.log("user additional info" , user.additionalUserInfo)
            const user = await createUserWithEmailAndPassword(auth, email, password)

            // this creates a new user with email and password using the auth configuration 
    

            //notifying that the registration was successful
            Alert.alert('Registrering lyckades', `Välkommen, ${email}!`);
            setShowSuccessMessage(true)

            // creates a database entry for the newly registered user, makes an object containing user's email and username.
            //  This is used as a reference to log in using the username instead/alongside email
           

            // after the user is created its displayName is updated
           
            console.log("user registered successfully");
          
        } catch (error: any) {

          Alert.alert('Error', error.message);
          setShowWarningPasswordMessage(true)
          console.log("Error registering user: ", error.message)
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrera dig</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Bekräfta lösenord"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
      />

      <Button mode="contained" onPress={handleSignUp} style={styles.loginButton}>
        Registrera
      </Button>

      {/* Navigate to Login Page */}
      <Button mode="outlined" onPress={() => navigation.navigate("Login")} style={styles.signUpButton}>
        Har du redan ett konto? Logga in här
      </Button>

      <Snackbar
        style={styles.snackbar}
        visible={showSuccessMessage}
        onDismiss={() => setShowSuccessMessage(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        <Text>Registrerad, {email}!</Text>
      </Snackbar>

      <Snackbar
        style={styles.snackbar}
        visible={showWarningPasswordMessage}
        onDismiss={() => setShowWarningPasswordMessage(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        <Text>Måste ange användarnamn och lösenord</Text>
      </Snackbar>

            <Snackbar style={styles.input}
                visible={x}
                onDismiss={() => setX(false)}
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
    padding: 10,
  },
  signUpButton: {
    marginTop: 20,
    width: "100%",
  },
  snackbar: {
    backgroundColor: "white",
  },
});
