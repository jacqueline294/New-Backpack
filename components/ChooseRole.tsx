import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ChooseRole({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Välj roll</Text>
      <Text style={styles.description}>
        Välj om du vill logga in som barn eller förälder.{"\n"}Barn behöver endast logga in en gång.{"\n"}Förälder behöver email och lösenord.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainPage")}>
        <Text style={styles.buttonText}>Barn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Parent")}>
        <Text style={styles.buttonText}>Förälder</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChooseRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
