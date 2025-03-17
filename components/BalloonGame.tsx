import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import SoundLevel from 'react-native-sound-level';

const BalloonGame = ({onBalloonBurst = () => {}}) => {// added = () => {} a fallback in case BalloonGame is accessed outside its parent component
  const [balloonSize, setBalloonSize] = useState(100); // this way, if onBalloonBurst is not passed as a prop, it won’t throw an error since the default function will be an empty function () => {}.
  const [balloonBurst, setBalloonBurst] = useState(false);
  const [balloonSize2, setBalloonSize2] = useState(0);
  const [balloonSize3, setBalloonSize3] = useState(0);
  const [balloonSize4, setBalloonSize4] = useState(0);
  const [balloonSize5, setBalloonSize5] = useState(0);
  const [balloonSize6, setBalloonSize6] = useState(0);

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
    if(balloonSize2 === 0) {
      const interval = setInterval(()=> {
        setBalloonSize2(50);
      }, 5000)
      return ()=> clearInterval(interval);
    }
  }, [balloonSize2])

  useEffect(()=> {
    if(balloonSize3 === 0) {
      const interval = setInterval(()=> {
        setBalloonSize3(50);
      }, 5000)
      return ()=> clearInterval(interval);
    }
  }, [balloonSize3])

  useEffect(()=> {
    if(balloonSize4 === 0) {
      const interval = setInterval(()=> {
        setBalloonSize4(50);
      }, 5000)
      return ()=> clearInterval(interval);
    }
  }, [balloonSize4])

  useEffect(()=> {
    if(balloonSize5 === 0) {
      const interval = setInterval(()=> {
        setBalloonSize5(50);
      }, 5000)
      return ()=> clearInterval(interval);
    }
  }, [balloonSize5])

  useEffect(()=> {
    if(balloonSize6 === 0) {
      const interval = setInterval(()=> {
        setBalloonSize6(50);
      }, 5000)
      return ()=> clearInterval(interval);
    }
  }, [balloonSize6])

  useEffect(()=> {
    if(balloonSize > 299) {
      setBalloonBurst(true);
      onBalloonBurst(true);
      setBalloonSize(0);
      if(balloonBurst) {
        
        setBalloonSize2(50);
        setBalloonSize3(50);
        setBalloonSize4(50);
        setBalloonSize5(50);
        setBalloonSize6(50);
      }
      
      
    }
  }, [balloonSize, balloonBurst])

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
    <View>
    <View style={styles.container}>
      <Text style={styles.text}>
        {balloonBurst ? 'The balloon burst! 🎉' : 'Blow into the mic to inflate the balloon! 🎈'}
      </Text>
      <TouchableOpacity style={[styles.balloon2, {width: balloonSize2, height: balloonSize2}]}
        onPress={()=>setBalloonSize2(0)}>

      </TouchableOpacity>
      <TouchableOpacity style={[styles.balloon3, {width: balloonSize3, height: balloonSize3}]}
        onPress={()=>setBalloonSize3(0)}>

      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.balloon4, {width: balloonSize4, height: balloonSize4}]}
        onPress={()=>setBalloonSize4(0)}>

      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.balloon5, {width: balloonSize5, height: balloonSize5}]}
        onPress={()=>setBalloonSize5(0)}>

      </TouchableOpacity>

      <TouchableOpacity style={[styles.balloon6, {width: balloonSize6, height: balloonSize6}]}
        onPress={()=>setBalloonSize6(0)}>

      </TouchableOpacity>
      <View
        style={[
          styles.balloon,
          { width: balloonSize, height: balloonSize },
        ]}
      ><Text style={[styles.text2, {width: balloonSize, height: balloonSize}]}>Blås!</Text></View>
      {balloonBurst && (
        <Text style={styles.resetText} onPress={resetBalloon}>
          Tap here to reset the game.
        </Text>
      )}
    </View>
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
  balloon2: {
    position: "absolute",
    top: 170,
    backgroundColor: 'lightblue',
    borderRadius: 150,
  },
  balloon3: {
    position: "absolute",
    top: 200,
    right: 10,
    backgroundColor: 'lightblue',
    borderRadius: 150,
  },
  balloon4: {
    position: "absolute",
    top: 190,
    right: 270,
    backgroundColor: 'lightblue',
    borderRadius: 150,
  },
  balloon5: {
    position: "absolute",
    top: 300,
    right: 100,
    backgroundColor: 'lightblue',
    borderRadius: 150,
  },
  balloon6: {
    position: "absolute",
    top: 260,
    right: 300,
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
