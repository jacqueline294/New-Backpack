import React, { useState, useEffect } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native"
import { Audio } from "expo-av"

import redSound from "../assets/red.mp3"
import blueSound from "../assets/blue.mp3"
import greenSound from "../assets/green.mp3"
import yellowSound from "../assets/yellow.mp3"

const colors: string[] = ["red", "blue", "green", "yellow"]
const sounds: Record<string, any> = {
  red: redSound,
  blue: blueSound,
  green: greenSound,
  yellow: yellowSound,
}

const { width, height } = Dimensions.get("window")
const isSmallScreen = width < 375

export default function SimonSays() {
  const [sequence, setSequence] = useState<string[]>([])
  const [playerInput, setPlayerInput] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [animValues, setAnimValues] = useState<Record<string, Animated.Value>>(
    colors.reduce(
      (acc, color) => ({ ...acc, [color]: new Animated.Value(1) }),
      {}
    )
  )

  useEffect(() => {
    if (gameStarted) {
      startNewGame()
    }
  }, [gameStarted])

  const playSound = async (color: keyof typeof sounds) => {
    const sound = new Audio.Sound()
    try {
      await sound.loadAsync(sounds[color])
      await sound.playAsync()
      setTimeout(() => sound.unloadAsync(), 1000)
    } catch (error) {
      console.log("Error playing sound", error)
    }
  }

  const playSequence = async (currentSequence: string[]) => {
    setIsPlaying(true)
    for (const color of currentSequence) {
      await new Promise((resolve) => {
        setTimeout(() => {
          animateButton(color)
          playSound(color)
          resolve(true)
        }, 800)
      })
      await new Promise((resolve) => setTimeout(resolve, 600))
    }
    setIsPlaying(false)
  }

  const animateButton = (color: string) => {
    Animated.sequence([
      Animated.timing(animValues[color] as Animated.Value, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animValues[color] as Animated.Value, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePress = (color: string) => {
    if (isPlaying) return
    animateButton(color)
    playSound(color)
    const newInput = [...playerInput, color]
    setPlayerInput(newInput)

    if (
      sequence.length === 0 ||
      newInput[newInput.length - 1] !== sequence[newInput.length - 1]
    ) {
      Alert.alert("Fel!", "Du tryckte på fel färg. Försök igen!", [
        { text: "Starta om", onPress: () => setGameStarted(false) },
      ])
      return
    }

    if (newInput.length === sequence.length) {
      setTimeout(() => {
        Alert.alert("Bra jobbat!", "Nu blir det svårare!")
        nextRound()
      }, 500)
    }
  }

  const nextRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)]
    const newSequence = [...sequence, newColor]
    setSequence(newSequence)
    setPlayerInput([])
    setTimeout(() => playSequence(newSequence), 1000)
  }

  const startNewGame = () => {
    const initialSequence = ["green"]
    setSequence(initialSequence)
    setPlayerInput([])
    setTimeout(() => playSequence(initialSequence), 1000)
  }

  const resetGame = () => {
    setGameStarted(false)
    setSequence([])
    setPlayerInput([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.simonBoard}>
        {colors.map((color) => (
          <Animated.View key={color} style={{ opacity: animValues[color] }}>
            <TouchableOpacity
              onPress={() => handlePress(color)}
              style={[styles.button, styles[color]]}
            />
          </Animated.View>
        ))}
        {!gameStarted && (
          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => setGameStarted(true)}
          >
            <Text style={styles.centerText}>STARTA SPELET</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>ÅTERSTÄLL</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  simonBoard: {
    width: isSmallScreen ? 220 : 240,
    height: isSmallScreen ? 220 : 240,
    borderRadius: isSmallScreen ? 110 : 120,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  button: {
    width: isSmallScreen ? 85 : 100,
    height: isSmallScreen ? 85 : 100,
    margin: 2,
    position: "absolute",
  },
  red: { backgroundColor: "red", top: 0, left: 0, borderTopLeftRadius: 120 },
  blue: {
    backgroundColor: "blue",
    top: 0,
    right: 0,
    borderTopRightRadius: 120,
  },
  green: {
    backgroundColor: "green",
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 120,
  },
  yellow: {
    backgroundColor: "yellow",
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 120,
  },
  centerButton: {
    position: "absolute",
    width: isSmallScreen ? 70 : 80,
    height: isSmallScreen ? 70 : 80,
    backgroundColor: "black",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: 0 }],
  },
  centerText: {
    color: "white",
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  resetText: {
    color: "white",
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: "bold",
  },
})
