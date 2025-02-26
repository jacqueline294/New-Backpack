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
import Parent from './components/Parent';
import AppUsageStats from './components/AppUsageStats';
import { UsageStatsProvider } from './components/UsageStatsContext';
import Dashboard from './components/Dashboard';
import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {

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
    const energy = AsyncStorage.getItem("energy").then((item) => {
      console.log("item(energy): ", item);
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
      <Stack.Screen name="Parent" component={Parent} /> 
      <Stack.Screen name="Stats" component={AppUsageStats} />
      <Stack.Screen name="Dash" component={Dashboard} />
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
