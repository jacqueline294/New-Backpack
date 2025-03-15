import React from "react"
import { View, Button, StyleSheet } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  EndlessAlphabet: undefined
  BrainDots: undefined
  MemoryMatch: undefined
  UnblockMe: undefined
  TjugoFyrtioatta: undefined
  SimonSays: undefined
}

type Props = {
  navigation: StackNavigationProp<RootStackParamList>
}

export default function GamesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button
        title="Play EndlessAlphabet"
        onPress={() => navigation.navigate("EndlessAlphabet")}
      />
      <Button
        title="Play BrainDots"
        onPress={() => navigation.navigate("BrainDots")}
      />
      <Button
        title="Play MemoryMatch"
        onPress={() => navigation.navigate("MemoryMatch")}
      />
      <Button
        title="Play UnblockMe"
        onPress={() => navigation.navigate("UnblockMe")}
      />
      <Button
        title="Play TjugoFyrtioatta"
        onPress={() => navigation.navigate("TjugoFyrtioatta")}
      />
      <Button
        title="Play SimonSays"
        onPress={() => navigation.navigate("SimonSays")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
