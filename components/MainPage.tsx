import React, { Suspense } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { useNavigation } from "@react-navigation/native";


function MainPage({navigation}) {
    return (
        <View>
            <Text>Välkommen till din egen Backpack, ha så kul med Emmo</Text>
            {/* <Button
                title="Du kan inte trycka button"

            /> */}

            <Dashboard></Dashboard>
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensures the container takes up the full screen height
      justifyContent: 'center', // Centers children vertically
      //alignItems: 'center', // Centers children horizontally
      width: "100%",
      
    },
  });

export default MainPage;
