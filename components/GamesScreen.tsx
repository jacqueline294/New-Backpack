import React from "react"
import { View, Button, StyleSheet } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  Sudoku: undefined
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
