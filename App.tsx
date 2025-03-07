import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './components/SignUp';
import NavTest from './components/NavTest';
import TestNavPage from './components/TestNavPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './components/HomeScreen';
import TestPage from './components/TestPage';
import ChooseRole from './components/ChooseRole';
import Loading from './components/Loading';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import ParentPage from './components/ParentPage';
import EmoSpace from './components/EmoSpace';
import EmoGame from './components/EmoGame';
import TalkItOut from './components/TalkItOut';
import EmoGameQ2 from './components/EmoGameQ2';
import EmoGameQ3 from './components/EmoGameQ3';
import EmoGameQ4 from './components/EmoGameQ4';
import EmoGameQ5 from './components/EmoGameQ5';

const Stack =createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <GestureHandlerRootView style ={{ flex: 1}}>
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
      <Stack.Screen name="EmoGameQ2" component={EmoGameQ2} />
      <Stack.Screen name="EmoGameQ3" component={EmoGameQ3} />
      <Stack.Screen name="EmoGameQ4" component={EmoGameQ4} />
      <Stack.Screen name="EmoGameQ5" component={EmoGameQ5} />
    </Stack.Navigator>
    </NavigationContainer>

    </GestureHandlerRootView>
    </SafeAreaProvider>

    
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
