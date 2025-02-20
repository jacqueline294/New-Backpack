import React from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";
import { useNavigation } from "@react-navigation/native";


function MainPage({navigation}) {
    return (
        <View>
                    <Text>Välkommen till din egen Backpack, ha så kul med Emmo</Text>
                    <Button
                    title="Du kan inte trycka button"
                    
                />
                
                        <Text>Välj om du vill logga in som barn eller förälder. Barn behöver endast logga in en gång. Förälder kommer behöva email och lösenord.</Text>
                        <Button 
                          title="Calender test"
                          onPress={() => navigation.navigate("Calender")}
                        />
                       
                        
                        
                        
                      
                </View>
    );
}

export default MainPage;