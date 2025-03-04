import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Image, Button, StyleSheet, TouchableOpacity } from "react-native"

const App = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Image in the center */}
      <Image
        source={{
          uri: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        }}
        style={styles.image}
      />

      {/* Buttons */}
      <TouchableOpacity style={[styles.button, styles.rightTop]}>
        <Button
          title="----------"
          onPress={() => alert("Top Button Pressed")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.bottom]}>
        <Button
          title="Activities"
          onPress={() => navigation.navigate("Activities")}
        />
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
          onPress={() => alert("Right Button Pressed")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.right2]}>
        <Button title="Games" onPress={() => alert("Right Button Pressed")} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 230,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure all child elements are positioned relative to this container
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // to make the image circular, if required
    marginBottom: 20,
    zIndex: 1, // Image stays on top of the buttons
  },
  button: {
    position: 'absolute',
  },
  top: {
    top: -60, // Adjust as per the button size and image size
    left: '80%',
    transform: [{ translateX: -50 }],
  },
  rightTop: {
    right: -0, // Move further right to avoid off-screen issue
    top: '50%',
    transform: [{ translateY: 0 }],
  },
  bottom: {
    bottom: -200, // Adjust as per the button size and image size
    left: '52.5%',
    transform: [{ translateX: 0 }],
  },
  left: {
    left: -0, // Move further left to avoid off-screen issue
    top: '40%',
    transform: [{ translateY: -50 }],
  },
  left2: {
    left: -0,
    top: "60%",
    transform: [{ translateY: 0}]
  },
  right: {
    right: -0, // Move further right to avoid off-screen issue
    top: '40%',
    transform: [{ translateY: -50 }],
  },
  right2: {
    right: 20,
    top: "80%",
    transform: [{ translateY: -100}]
  },
  right3: {
    top: 75, // Adjust as per the button size and image size
    left: '40%',
    transform: [{ translateX: -0 }],
  }
});

export default App;