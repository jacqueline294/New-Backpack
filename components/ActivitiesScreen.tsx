import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

const ActivitiesScreen = () => {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [activityOptions, setActivityOptions] = useState([])
  const [blinkAnim] = useState(new Animated.Value(1))
  const navigation = useNavigation()

  const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }

  useEffect(() => {
    if (activityOptions.length === 0 && !selectedActivity) {
      startBlinking()
    }
  }, [activityOptions, selectedActivity])

  const individualGames = [
    "Skuggfigurer",
    "Gå på linjen",
    "Djurimitationer",
    "Andningsövningar",
    "Dansstopp",
  ]

  const socialGames = [
    "Kurragömma",
    "Sten, sax, påse",
    "Gissa ljudet",
    "Berättelsekedja",
    "Armhävningar",
  ]

  // B i ordning
  const animateButtons = (buttons) => {
    return buttons.map((button, index) => {
      const blinkValue = new Animated.Value(0)

      setTimeout(() => {
        Animated.timing(blinkValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }, index * 1000)

      return (
        <Animated.View
          key={index}
          style={[styles.blinkButton, { opacity: blinkValue }]}
        >
          <TouchableOpacity onPress={() => setSelectedActivity(button)}>
            <Text style={styles.blinkButtonText}>{button}</Text>
          </TouchableOpacity>
        </Animated.View>
      )
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Välj en aktivitet</Text>

      {selectedActivity ? (
        <>
          <Text style={styles.activityText}>{selectedActivity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedActivity(null)}
          >
            <Text style={styles.buttonText}>Tillbaka</Text>
          </TouchableOpacity>
        </>
      ) : activityOptions.length > 0 ? (
        <>
          {animateButtons(activityOptions)}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActivityOptions([])}
          >
            <Text style={styles.buttonText}>Tillbaka</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Blinkande huvudknappar */}
          <Animated.View style={[styles.blinkButton, { opacity: blinkAnim }]}>
            <TouchableOpacity
              onPress={() => setActivityOptions(individualGames)}
            >
              <Text style={styles.blinkButtonText}>Individuella lekar</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.blinkButton, { opacity: blinkAnim }]}>
            <TouchableOpacity onPress={() => setActivityOptions(socialGames)}>
              <Text style={styles.blinkButtonText}>Sociala lekar</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Tillbaka till Dashboard</Text>
      </TouchableOpacity>
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
  activityText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  blinkButton: {
    backgroundColor: "#ADD8E6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  blinkButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
})

export default ActivitiesScreen
