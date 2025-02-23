import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

const ActivitiesScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aktivitetsförslag</Text>
      <Text>1. Armhävningar</Text>
      <Text>2. Andningsövning</Text>
      <Text>3. Musikpaus</Text>

      <Button
        title="Tillbaka till Dashboard"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
})

export default ActivitiesScreen
