
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './components/SignUp';
import NavTest from './components/NavTest';
import TestNavPage from './components/TestNavPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './components/HomeScreen';
import TestPage from './components/TestPage';
import ChooseRole from './components/ChooseRole';
import Loading from './components/Loading';
import MainPage from './components/MainPage';
import Login from './components/Login';
import AppUsageStats from './components/AppUsageStats';
import { UsageStatsProvider } from './components/UsageStatsContext';
import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryUsageStats } from '@brighthustle/react-native-usage-stats-manager';
import RoomScreen from './components/RoomScreen';
import { getFCMToken, requestUserPermission, setupPushNotification } from './components/PushNotificationService';
import PushNotification, { Importance } from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging"
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import ParentPage from './components/ParentPage';
import EmoSpace from './components/EmoSpace';
import EmoGame from './components/EmoGame';
import TalkItOut from './components/TalkItOut';
import ActivitiesScreen from './components/ActivitiesScreen';
import GamesScreen from './components/GamesScreen';
import EndlessAlphabet from "./components/EndlessAlphabet"
import BrainDotsGame from './components/BrainDots';
import EmoGameQ2 from './components/EmoGameQ2';
import EmoGameQ3 from './components/EmoGameQ3';
import EmoGameQ4 from './components/EmoGameQ4';
import EmoGameQ5 from './components/EmoGameQ5';
import MemoryMatch from './components/MemoryMatch';
import BalloonGame from './components/BalloonGame';
import UnblockMe from './components/UnblockMe';
import TjugoFyrtioatta from './components/TjugoFyrtioatta';
import BackgroundTimer from "react-native-background-timer"
import SimonSays from './components/SimonSays';
import BlackJack from './components/BlackJack';
import Fit from './components/Fit';
import VoiceTest from './components/VoiceTest';
import { SpeechRecognitionRootView } from 'react-native-voicebox-speech-rec';



/* PushNotification.localNotification({
  title: "hello",
  message: 'This is a test push notification',
  playSound: true,
  soundName: "default",
  vibrate: true
}); */
const Stack = createStackNavigator();



export default function App() {
  const [sent, setSent] = useState(false);

  useEffect(()=> {
    PushNotification.createChannel(
      {
          channelId: "default-channel-id",
          channelName: "Default Channel",
          channelDescription: "A default channel for notifications",
          soundName: "default",
          importance: Importance.HIGH,
          vibrate: true,
      },
    
      (created) => {console.log(`createChannel returned '${created}`);}
    );
  }, []);
  /* useEffect(() => {
    requestUserPermission();
    getFCMToken();

    setupPushNotification();
  }, []); */

  /* useEffect(() => {

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log("Foreground notification: ", remoteMessage);
    });

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log("Background notification: ", remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if(remoteMessage) {
          console.log("Notification caused app to open: ", remoteMessage);
        }
      })

      return ()=> {
        unsubscribeOnMessage();
        unsubscribeOnNotificationOpenedApp();
      }

  }, []) */

  useEffect(() => {

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
      },
      async (taskId) => {
        console.log("[BackgroundFetch] Task received: ", taskId);
        
        await performBackground();
  
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log("[BackgroundFetch] failed to start: ", error);
      }
    );
  
    BackgroundFetch.start();
  
    return () => {
      BackgroundFetch.stop();
    };



  }, []);

  const performBackground = async () => {
    console.log("running background task");
    

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();//new Date(currentDate.setHours(0, 0, 0, 0)).getTime();

    const result3 = await queryUsageStats(0, startOfDay, currentTime );

    const YT = Object.values(result3).filter(item => item.appName === "YouTube").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Instagram = Object.values(result3).filter(item => item.appName === "Instagram").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const TikTok = Object.values(result3).filter(item => item.appName === "TikTok").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Snapchat = Object.values(result3).filter(item => item.appName === "Snapchat").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Triller = Object.values(result3).filter(item => item.appName === "Triller").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Roblox = Object.values(result3).filter(item => item.appName === "Roblox").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Fortnite = Object.values(result3).filter(item => item.appName === "Fortnite").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const AmongUs = Object.values(result3).filter(item => item.appName === "Among Us").reduce((sum, item) => sum + item.totalTimeInForeground, 0);

    const badAppsTotalTimeInForeground = YT + Instagram + TikTok + Snapchat + Triller + Roblox + Fortnite + AmongUs; 

    const calculateEnergy = () => {
      let energi = 100 - badAppsTotalTimeInForeground/1000;

      if (energi <= 0) {
          energi = 1
      }
      return energi.toFixed(1).toString();
    }

    AsyncStorage.setItem("energy", calculateEnergy());

    const energy = await AsyncStorage.getItem("energy");
    const energy2 = await AsyncStorage.getItem("energy1"); // does not work, is delayed

    console.log("energy: ", energy);

    PushNotification.localNotification({
      title: "Albanie",
      message: "Energinivå: " + energy + " energi2: " + energy2 + " Tid: " + new Date().toLocaleTimeString(),
      playSound: true,
      soundName: "default",
      vibrate: true,
      channelId: "default-channel-id",
      bigLargeIcon: "https://i0.wp.com/plopdo.com/wp-content/uploads/2021/11/feature-pic.jpg?fit=537%2C322&ssl=1"
    });

    
    //console.log("energy: ", energy);

    /* return (
      <View>
        <Text>Background Task test</Text>
      </View>
    ) */
  }

  useEffect(() => {
    const checkAppUsage = async () => {
      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
  
      const result3 = await queryUsageStats(0, startOfDay, currentTime);
  
      const YT = Object.values(result3).filter(item => item.appName === "YouTube").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const Instagram = Object.values(result3).filter(item => item.appName === "Instagram").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const TikTok = Object.values(result3).filter(item => item.appName === "TikTok").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const Snapchat = Object.values(result3).filter(item => item.appName === "Snapchat").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const Triller = Object.values(result3).filter(item => item.appName === "Triller").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const Roblox = Object.values(result3).filter(item => item.appName === "Roblox").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const Fortnite = Object.values(result3).filter(item => item.appName === "Fortnite").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
      const AmongUs = Object.values(result3).filter(item => item.appName === "Among Us").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
  
      const badAppsTotalTimeInForeground = YT + Instagram + TikTok + Snapchat + Triller + Roblox + Fortnite + AmongUs;
      console.log("backgroundApp: ", badAppsTotalTimeInForeground)
      console.log("sent: ", sent);
      if (badAppsTotalTimeInForeground > 360 && !sent) { // Notify if > 1 hour
        PushNotification.localNotification({
          title: "App Usage Alert",
          message: "You've spent too much time on social/gaming apps!",
          playSound: true,
          soundName: "default",
          vibrate: true,
          channelId: "default-channel-id",
          bigPictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnbGXAzowHiN-JrPfFC0hmWh_B3FRhA7tgA&s",
        });
        setSent(true);
      }
    };
    
  
    // Check app usage every minute
    const interval = BackgroundTimer.setInterval(checkAppUsage, 6000);
  
    return () => {BackgroundTimer.clearInterval(interval);}
  }, [sent]);

  
  // Reset sent on a Daily basis
  useEffect(() => {
    const resetNotificationFlag = async () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
  
      const lastNotificationDay = await AsyncStorage.getItem('lastNotificationDay');
      if (lastNotificationDay !== currentDay.toString()) {
        setSent(false); // Reset the flag
        await AsyncStorage.setItem('lastNotificationDay', currentDay.toString()); // Update the stored day
      }
    };
  
    // Check and reset the flag every minute
    const interval = BackgroundTimer.setInterval(resetNotificationFlag, 60000);
  
    return () => {
      BackgroundTimer.clearInterval(interval); // Cleanup on unmount
    };
  }, []);
  

  

  /* headerLeft: () => null removes the back button, headerShown: false removes the entire header  */
  return (
    <UsageStatsProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */}
          {/* <SpeechRecognitionRootView>
      <VoiceTest/>
    </SpeechRecognitionRootView> */}

    


          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="TestPg" component={TestPage} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ChooseRole" component={ChooseRole} />
              <Stack.Screen name="Loading" component={Loading} />
              <Stack.Screen name="MainPage" component={MainPage} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Calendar" component={Calendar} />
              <Stack.Screen name="ParentPage" component={ParentPage} />
              <Stack.Screen name="EmoSpace" component={EmoSpace} />
              <Stack.Screen name="EmoGame" component={EmoGame} />
              <Stack.Screen name="TalkItOut" component={TalkItOut} />
              <Stack.Screen name="Stats" component={AppUsageStats} />
              <Stack.Screen name="Room" component={RoomScreen} />
              <Stack.Screen name="Activities" component={ActivitiesScreen} />
              <Stack.Screen name="GamesScreen" component={GamesScreen} />
              <Stack.Screen name="EndlessAlphabet" component={EndlessAlphabet} />
              <Stack.Screen name="BrainDots" component={BrainDotsGame} />
              <Stack.Screen name="MemoryMatch" component={MemoryMatch} />
              <Stack.Screen name="UnblockMe" component={UnblockMe} />
              <Stack.Screen name="TjugoFyrtioatta" component={TjugoFyrtioatta} />
              <Stack.Screen name="SimonSays" component={SimonSays} />
              <Stack.Screen name="Black" component={BlackJack} />

              <Stack.Screen name="Balloon" component={BalloonGame} />
              <Stack.Screen name="Fit" component={Fit} />
              <Stack.Screen name="Voice" component={VoiceTest} />

              <Stack.Screen name="EmoGameQ2" component={EmoGameQ2} />
              <Stack.Screen name="EmoGameQ3" component={EmoGameQ3} />
              <Stack.Screen name="EmoGameQ4" component={EmoGameQ4} />
              <Stack.Screen name="EmoGameQ5" component={EmoGameQ5} />
            </Stack.Navigator>
          </NavigationContainer>



        </GestureHandlerRootView>

      </SafeAreaProvider>
    </UsageStatsProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
  },
})
