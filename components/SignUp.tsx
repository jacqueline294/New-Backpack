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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [shortPassword, setShortPassword] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showWarningPasswordMessage, setShowWarningPasswordMessage] = useState<boolean>(false);
  const [showUnmatchedPassword, setUnmatchedPassword] = useState<boolean>(false);

  const handleSignUp = async () => {
    try {
      const emailRegex: RegExp = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

      if (emailRegex.test(email) && password.length > 5 && password === password2) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Registrering lyckades", `Välkommen, ${email}!`);
        setShowSuccessMessage(true);
      } else if (password !== password2) {
        Alert.alert("Fel", "Lösenorden matchar inte!");
        setUnmatchedPassword(true);
      } else if (password.length < 6) {
        Alert.alert("Fel", "Lösenordet är för kort (minst 6 tecken)");
        setShortPassword(true);
      } else if (!emailRegex.test(email)) {
        Alert.alert("Fel", "Ogiltig e-postadress");
      }
    } catch (error: any) {
      Alert.alert("Fel", error.message);
      setShowWarningPasswordMessage(true);
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

      <Snackbar
        style={styles.snackbar}
        visible={showUnmatchedPassword}
        onDismiss={() => setUnmatchedPassword(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        <Text>Lösenord stämmer ej överens</Text>
      </Snackbar>
    </View>
  );
};

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
