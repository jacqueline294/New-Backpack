import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import SoundLevel from 'react-native-sound-level';

const BalloonGame = ({onBalloonBurst}) => {
  const [balloonSize, setBalloonSize] = useState(100);
  const [balloonBurst, setBalloonBurst] = useState(false);

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'We need access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(()=> {
    requestMicrophonePermission();
  }, [])

  useEffect(()=> {
    if(balloonSize > 299) {
      setBalloonBurst(true);
      onBalloonBurst(true)
    }
  }, [balloonSize])

  useEffect(() => {
    //requestMicrophonePermission();
    if (SoundLevel) {
      SoundLevel.start();
  
      SoundLevel.onNewFrame = (data) => {
        const soundLevel = data.value;
        //console.log('Sound Level:', soundLevel);
  
        if(!balloonBurst) {
           if (soundLevel > -10) {
          setBalloonSize((prevSize) => Math.min(prevSize + 10, 300));
             } else {
          setBalloonSize((prevSize) => Math.max(prevSize - 2, 50));
             } 
        }
        //console.log("balloon size: ", balloonSize )
        /* if(balloonSize > 299) {
            setBalloonBurst(true)
        } */
      };
  
      return () => {
        SoundLevel.stop();
      };
    } else {
      console.error('SoundLevel is not initialized');
    }
  }, [balloonBurst]);

  const resetBalloon = () => {
    setBalloonBurst(false);
    setBalloonSize(100);
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {balloonBurst ? 'The balloon burst! 🎉' : 'Blow into the mic to inflate the balloon! 🎈'}
      </Text>
      <View
        style={[
          styles.balloon,
          { width: balloonSize, height: balloonSize },
        ]}
      ><Text style={styles.text2}>Blås!</Text></View>
      {balloonBurst && (
        <Text style={styles.resetText} onPress={resetBalloon}>
          Tap here to reset the game.
        </Text>
      )}
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
    top: 250,
    backgroundColor: 'lightblue',
    borderRadius: 150,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  text2: {
    
    position: 'absolute', // Absolutely position the text inside the balloon
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    /* transform: [{ translateX: -50% }, { translateY: -50% }],  */// Offset by half of the text's width/height
    fontSize: 18,
  },
  resetText: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default BalloonGame;
