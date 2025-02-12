import React from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";

function TestPage({navigation}) {
    return (
        <View>
                    <Text>Man kan inte!</Text>
                    <Button
                    title="Man kan menu"
                    onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title="Man kan signup"
                    onPress={() => navigation.navigate('SignUp')}
                />
                </View>
    );
}

export default TestPage;