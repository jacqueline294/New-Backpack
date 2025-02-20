import React from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

function TestPage() {
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

export default TestPage;