import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './components/SignUp';
import NavTest from './components/NavTest';
import TestNavPage from './components/TestNavPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
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
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging"
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import ParentPage from './components/ParentPage';
import EmoSpace from './components/EmoSpace';
import EmoGame from './components/EmoGame';
import TalkItOut from './components/TalkItOut';


/* PushNotification.localNotification({
  title: "hello",
  message: 'This is a test push notification',
  playSound: true,
  soundName: "default",
  vibrate: true
}); */
const Stack = createStackNavigator();

export default function App() {
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
      return energi.toString();
    }

    AsyncStorage.setItem("energy", calculateEnergy());

    const energy = await AsyncStorage.getItem("energy");

    console.log("energy: ", energy);

    PushNotification.localNotification({
      title: "hello",
      message: 'This is a test push notification' + energy,
      playSound: true,
      soundName: "default",
      vibrate: true
    });
    //console.log("energy: ", energy);

    /* return (
      <View>
        <Text>Background Task test</Text>
      </View>
    ) */
  }

  

  /* headerLeft: () => null removes the back button, headerShown: false removes the entire header  */
  return (
    <UsageStatsProvider>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */}

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
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
