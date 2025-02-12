import React from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";

function ChooseRole({navigation}) {
    return (
      <View>
        <Text>Choose if you wanna login as a child or a parent. As a child you will stay logged in as often as your phone is on. Parent will have to login again each time.</Text>
        <Button
          title="Child"
          onPress={() => navigation.navigate("Child")}
        />
        <Button
          title="Parent"
          onPress={() => navigation.navigate("Parent")}
        />
      </View>
    );
}

export default ChooseRole;