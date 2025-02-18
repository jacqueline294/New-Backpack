import React, { Suspense } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import SignUp from "./SignUp";
import ErrorBoundry from "./ErrorBoundry";
import Room from "./Room";

function TestPage() {
    return (
        <View style={styles.container}>
            <Text>Välkommen till din egen Backpack, ha så kul med Emmo</Text>
            <Button
                title="Du kan inte trycka button"

            />
            <Suspense fallback={<Text>Laddar...</Text>}>
                <ErrorBoundry>
                    <Room></Room>
                </ErrorBoundry>
            </Suspense>

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

export default TestPage;