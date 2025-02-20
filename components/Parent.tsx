import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define navigation stack types
type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ParentPage: undefined;
};

const ParentPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Parent Page!</Text>

      {/* Logout Button */}
      <Button
        title="Logga ut"
        onPress={() => navigation.navigate("Login")} 
      />
    </View>
  );
};

export default ParentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
