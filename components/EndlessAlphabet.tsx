import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native"

const words = ["APPLE", "BANANA", "ORANGE", "GRAPE", "MANGO"]

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5)
}

const AlphabetGame = () => {
  const [currentWord, setCurrentWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  )
  const [shuffledLetters, setShuffledLetters] = useState(
    shuffleArray([...currentWord])
  )
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])

  const handleLetterPress = (letter: string, index: number) => {
    setSelectedLetters([...selectedLetters, letter])
    setShuffledLetters(shuffledLetters.filter((_, i) => i !== index))
  }

  const resetGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(newWord)
    setShuffledLetters(shuffleArray([...newWord]))
    setSelectedLetters([])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endless Alphabet</Text>
      <View style={styles.wordContainer}>
        {currentWord.split("").map((letter, index) => (
          <Text key={index} style={styles.letter}>
            {selectedLetters[index] || "_"}
          </Text>
        ))}
      </View>
      <FlatList
        data={shuffledLetters}
        numColumns={5}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.letterButton}
            onPress={() => handleLetterPress(item, index)}
          >
            <Text style={styles.letterText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedLetters.join("") === currentWord && (
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetText}>Nytt Ord!</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  wordContainer: { flexDirection: "row", marginBottom: 20 },
  letter: { fontSize: 32, marginHorizontal: 5 },
  letterButton: {
    padding: 15,
    margin: 5,
    backgroundColor: "#f0a",
    borderRadius: 5,
  },
  letterText: { fontSize: 24, color: "#fff" },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0a0",
    borderRadius: 5,
  },
  resetText: { fontSize: 20, color: "#fff" },
})

export default AlphabetGame
