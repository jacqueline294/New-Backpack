import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import SignUp from "./SignUp";
import {  Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";



function ChooseRole({navigation}) {
    
    return (
      <View>
        <Text>Välj om du vill logga in som barn eller förälder. Barn behöver endast logga in en gång. Förälder kommer behöva email och lösenord.</Text>
        <Button 
          title="Barn"
          onPress={() => navigation.navigate("MainPage")}
        />
        
        <Button 
          title="Förälder"
          onPress={() => navigation.navigate("Parent")}
        />
        
      </View>
    );
}

export default ChooseRole;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 10,
    },
    loginButton: {
      marginTop: 20,
      width: '100%',
      padding: 10,
    },
    snackbar: {

        backgroundColor: 'white'
    }
  });