import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Image in the center */}
      <Image 
        source={{ uri: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' }} 
        style={styles.image} 
      />

      {/* Buttons */}
      <TouchableOpacity style={[styles.button, styles.rightTop]}>
        <Button title="----------......" onPress={() => alert("Top Button Pressed")} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.bottom]}>
        <Button title="Activities" onPress={() => alert("Bottom Button Pressed")} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.left]}>
        <Button title="emo space" onPress={() => navigation.navigate("EmoSpace")} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.left2]}>
        <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.right3]}>
        <Button title="Screen time." onPress={() => alert("Right Button Pressed")} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.right2]}>
        <Button title="Games" onPress={() => alert("Right Button Pressed")} />
      </TouchableOpacity>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    zIndex: 1,
  },
  button: {
    position: 'absolute',
  },
  rightTop: {
    right: 0,
    top: '0%',
    transform: [{ translateY: -50 }],
  },
  bottom: {
    bottom: -30,
    left: '52.5%',
    transform: [{ translateX: -50 }],
  },
  left: {
    left: -0, // Move further left to avoid off-screen issue
    top: 150,
    transform: [{ translateY: -50 }],
  },
  left2: {
    left: -0,
    top: 75,
    transform: [{ translateY: -50}]
  },
  right: {
    right: -0, // Move further right to avoid off-screen issue
    top: '60%',
    transform: [{ translateY: -50 }],
  },
  right3: {
    top: 75,
    left: '95%',
    transform: [{ translateX: -50 }],
  },
  right2: {
    right: 0,
    top: '40%',
    transform: [{ translateY: -50 }],
  },
});

export default App;
