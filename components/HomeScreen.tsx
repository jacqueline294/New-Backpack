import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Dashboard from "./Dashboard";

// Define the navigation type for the stack
type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

// Define the navigation prop type
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "SignUp">;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "SignUp">;

// Define the props type for the component
type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>VÄLKOMMEN TILL BACKPACK</Text>
      

      <Button mode="contained" onPress={() => navigation.navigate("SignUp")} style={styles.button}>
        Registrering
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate("Login")} style={styles.button}>
        Har du redan ett konto? Logga in här
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate("Stats")} style={styles.button}>
        AppUsageStats
      </Button>
      

      {/* <Dashboard></Dashboard> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#666",
  },
  button: {
    marginTop: 20,
    width: "100%",
    padding: 10,
  },
});

export default HomeScreen;
