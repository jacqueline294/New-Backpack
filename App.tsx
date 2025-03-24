import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import SignUp from "./components/SignUp"
import NavTest from "./components/NavTest"
import TestNavPage from "./components/TestNavPage"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "./components/HomeScreen"
import TestPage from "./components/TestPage"
import ChooseRole from "./components/ChooseRole"
import Loading from "./components/Loading"
import MainPage from "./components/MainPage"
import Login from "./components/Login"
/* import AppUsageStats from "./components/AppUsageStats" */
import { UsageStatsProvider } from "./components/UsageStatsContext"
import BackgroundFetch from "react-native-background-fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { queryUsageStats } from "@brighthustle/react-native-usage-stats-manager"
import RoomScreen from "./components/RoomScreen"
import {
  getFCMToken,
  requestUserPermission,
  setupPushNotification,
} from "./components/PushNotificationService"
import PushNotification, { Importance } from "react-native-push-notification"
import messaging from "@react-native-firebase/messaging"
import Calendar from "./components/Calendar"
import Dashboard from "./components/Dashboard"
import ParentPage from "./components/ParentPage"
import EmoSpace from "./components/EmoSpace"
import EmoGame from "./components/EmoGame"
import TalkItOut from "./components/TalkItOut"
import ActivitiesScreen from "./components/ActivitiesScreen"
import GamesScreen from "./components/GamesScreen"
import EndlessAlphabet from "./components/EndlessAlphabet"
import BrainDotsGame from "./components/BrainDots"
import EmoGameQ2 from "./components/EmoGameQ2"
import EmoGameQ3 from "./components/EmoGameQ3"
import EmoGameQ4 from "./components/EmoGameQ4"
import EmoGameQ5 from "./components/EmoGameQ5"
import MemoryMatch from "./components/MemoryMatch"
import BalloonGame from "./components/BalloonGame"
import UnblockMe from "./components/UnblockMe"
import TjugoFyrtioatta from "./components/TjugoFyrtioatta"
import BackgroundTimer from "react-native-background-timer"
import SimonSays from "./components/SimonSays"
import FyraiRad from "./components/FyraiRad"
import Paintly from "./components/Paintly"

/* PushNotification.localNotification({
  title: "hello",
  message: 'This is a test push notification',
  playSound: true,
  soundName: "default",
  vibrate: true
}); */
const Stack = createStackNavigator()

export default function App() {
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
              {/* <Stack.Screen name="Stats" component={AppUsageStats} /> */}
              <Stack.Screen name="Room" component={RoomScreen} />
              <Stack.Screen name="Activities" component={ActivitiesScreen} />
              <Stack.Screen name="GamesScreen" component={GamesScreen} />
              <Stack.Screen
                name="EndlessAlphabet"
                component={EndlessAlphabet}
              />
              <Stack.Screen name="BrainDots" component={BrainDotsGame} />
              <Stack.Screen name="MemoryMatch" component={MemoryMatch} />
              <Stack.Screen name="UnblockMe" component={UnblockMe} />
              <Stack.Screen
                name="TjugoFyrtioatta"
                component={TjugoFyrtioatta}
              />
              <Stack.Screen name="SimonSays" component={SimonSays} />
              <Stack.Screen name="FyraiRad" component={FyraiRad} />
              <Stack.Screen name="Paintly" component={Paintly} />

              <Stack.Screen name="Balloon" component={BalloonGame} />

              <Stack.Screen name="EmoGameQ2" component={EmoGameQ2} />
              <Stack.Screen name="EmoGameQ3" component={EmoGameQ3} />
              <Stack.Screen name="EmoGameQ4" component={EmoGameQ4} />
              <Stack.Screen name="EmoGameQ5" component={EmoGameQ5} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </UsageStatsProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
  },
})
