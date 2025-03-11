import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SoundLevel from 'react-native-sound-level';

const BalloonGame = () => {
  const [balloonSize, setBalloonSize] = useState(100);

  useEffect(() => {
    if (SoundLevel) {
      SoundLevel.start();
  
      SoundLevel.onNewFrame = (data) => {
        const soundLevel = data.value;
        console.log('Sound Level:', soundLevel);
  
        if (soundLevel > -10) {
          setBalloonSize((prevSize) => Math.min(prevSize + 5, 300));
        } else {
          setBalloonSize((prevSize) => Math.max(prevSize - 2, 50));
        }
      };
  
      return () => {
        SoundLevel.stop();
      };
    } else {
      console.error('SoundLevel is not initialized');
    }
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Blow into the mic to inflate the balloon! 🎈</Text>
      <View
        style={[
          styles.balloon,
          { width: balloonSize, height: balloonSize },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  balloon: {
    backgroundColor: 'red',
    borderRadius: 150,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default BalloonGame;
