import React from "react";
import { View, Text, StyleSheet } from "react-native";


interface EnergyBarProps {
    value: number;
}

const EnergyBar = ( {value}: EnergyBarProps) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    const remaingValue = 100 - clampedValue;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{clampedValue}%</Text>
            <View style={styles.barBackground}>
                <View
                 style={[
                    styles.barFill, 
                    {
                        width: `${clampedValue}%`,
                        backgroundColor: "#4caf50",
                    },
                 ]}/>
            </View>
           {/*  <View style={[
                styles.barFill,
                {
                    width: `${clampedValue}%`,
                    backgroundColor: "#4caf50",

                }
            ]}/> */}
        </View>
    )
};

export default EnergyBar;

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        marginVertical: 100,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    barBackground: {
        width: "30%",
        height: 20,
        backgroundColor: "red",
        borderRadius: 10,
        overflow: "hidden",
        flexDirection: "row",
    },
    barFill: {
        height: "100%",
       /*  backgroundColor: "#4caf50",
        borderRadius: 10, */
    }

})