import React from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";

function TestPage({navigation}) {
    return (
        <View>
                    <Text>Menyval:</Text>
                    <Button
                    title="Hem meny"
                    onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title="Registrera"
                    onPress={() => navigation.navigate('SignUp')}
                />
                </View>
    );
}

export default TestPage;