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
import Calender from './components/Calender';
import Login from './components/Login';
import Parent from './components/Parent';

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
      <Stack.Screen name="Calender" component={Calender} />
      {/*<Stack.Screen name="Parent" component={Parent} /> */}
      <Stack.Screen name="Parent" component={Parent} /> 
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
