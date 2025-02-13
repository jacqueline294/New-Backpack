import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Loading = () => {
    const [emailVerified, setEmailVerified] = useState("test");
    console.log("Email verified", emailVerified); 
const navigation = useNavigation();
        
    useEffect(() => {
        const intervalId=setInterval(() => {
            const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            try {            
            await user?.reload();
            if (user.emailVerified) {
                navigation.navigate("ChooseRole");
            }
            } catch (error) {
                console.error("Error reloading user data:", error);
            }     
        });                     
              console.log("This runs every 5 seconds");   
            }, 5000);
            return () => clearInterval(intervalId);
        },[]);        
    return (
        <View>
            <Text>Waiting for verification</Text>                    
        </View>
    );
}

export default Loading;