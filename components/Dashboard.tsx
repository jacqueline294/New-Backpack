import { useNavigation } from "@react-navigation/native"
import React from "react"
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native"
import EnergyBar from "./EnergyBar"
import { useUsageStats } from "./UsageStatsContext"

const App = () => {
  const navigation = useNavigation()
  const { energy, setEnergy } = useUsageStats()

  const refillEnergy = () => {
    setEnergy((prevEnergy) => {
      const newEnergy = prevEnergy + 10
      return newEnergy > 100 ? 100 : newEnergy
    })
  }
  const angry =
    "https://t4.ftcdn.net/jpg/00/68/33/03/360_F_68330331_dKqChy33w0TcNHJEkqT5iw97QOX8la7F.jpg"

  const neutral =
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"

  const happy =
    "https://thumbs.dreamstime.com/b/cheerful-cartoon-style-orange-white-cat-big-joyful-smile-closed-eyes-as-if-laughing-cheerful-cartoon-style-341221817.jpg"
  let emotion = ""

  if (energy < 50) {
    emotion = angry
  }
  if (energy > 80) {
    emotion = happy
  }
  if (energy >= 50 && energy <= 80) {
    emotion = neutral
  }

  return (
    <View style={styles.container}>
      {/* Image in the center */}
      <Image source={{ uri: emotion }} style={styles.image} />

      {/* Buttons */}
      <TouchableOpacity style={[styles.button, styles.rightTop]}>
        <EnergyBar value={energy} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.bottom]}>
        <Button
          title="Activities"
          onPress={() => navigation.navigate("Activities")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.bottom2]}>
        <Button title="Main" onPress={() => navigation.navigate("Home")} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.bottom2]}>
        <Button title="Main" onPress={() => navigation.navigate("Home")} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.left]}>
        <Button
          title="emo space"
          onPress={() => navigation.navigate("EmoSpace")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.left2]}>
        <Button
          title="Calendar"
          onPress={() => navigation.navigate("Calendar")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.right3]}>
        <Button
          title="Screen time."
          onPress={() => navigation.navigate("Stats")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.right2]}>
        <Button
          title="Games"
          onPress={() => navigation.navigate("GamesScreen")}
        />
        <Button
          title="Games"
          onPress={() => navigation.navigate("GamesScreen")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.right4]}>
        <Button
          title="Balloon"
          onPress={() => navigation.navigate("Balloon")}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 130,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    right: 0,
    marginBottom: -100,
    zIndex: 1,
  },
  button: {
    position: "absolute",
  },
  rightTop: {
    right: -8,
    top: -160,

    transform: [{ translateY: -50 }],
    width: 500,
    marginRight: 10,
  },
  bottom: {
    bottom: -200,
    left: "52.5%",

    transform: [{ translateX: -50 }],
  },
  bottom2: {
    bottom: -200,
    left: "22.5%",
    transform: [{ translateX: -50 }],
  },
  left: {
    left: -0, // Move further left to avoid off-screen issue
    top: 130,
    transform: [{ translateY: -50 }],
  },
  left2: {
    left: -0,

    top: 40,
    transform: [{ translateY: -50 }],
  },
  right: {
    right: -0, // Move further right to avoid off-screen issue
    top: "60%",
    transform: [{ translateY: -50 }],
  },

  right3: {
    top: 85,
    left: "86%",
    transform: [{ translateX: -50 }],
  },
  right2: {
    right: 0,
    top: 36,
    transform: [{ translateY: -50 }],
  },
  right4: {
    right: 70,
    top: 256,

    transform: [{ translateY: -50 }],
  },
  right3: {
    top: 75, // Adjust as per the button size and image size
    left: "95%",
    transform: [{ translateX: -50 }],
  },
})

export default App
