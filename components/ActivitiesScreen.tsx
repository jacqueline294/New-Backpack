import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useUsageStats } from "./UsageStatsContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import EnergyBar from "./EnergyBar";



const ActivitiesScreen = () => {
  const { energy, setEnergy } = useUsageStats();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityOptions, setActivityOptions] = useState([]);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const startBlinking = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  useEffect(() => {
    if (activityOptions.length === 0 && !selectedActivity) {
      startBlinking();
    } else {
      blinkAnim.stopAnimation();
    }
  }, [activityOptions, selectedActivity, startBlinking, blinkAnim]);

  const individualGames = [
    "Skuggfigurer",
    "Gå på linjen",
    "Djurimitationer",
    "Andningsövningar",
    "Dansstopp",
  ];
  const socialGames = [
    "Kurragömma",
    "Sten, sax, påse",
    "Gissa ljudet",
    "Berättelsekedja",
    "Armhävningar",
  ];

  const refillEnergy = useCallback(() => {
    setEnergy((prevEnergy) => {
      const newEnergy = prevEnergy + 10;
      return newEnergy > 100 ? 100 : newEnergy;
    });
  }, [setEnergy]);

  const animatedButtons = useMemo(() => {
    return activityOptions.map((button, index) => {
      const blinkValue = new Animated.Value(0);

      setTimeout(() => {
        Animated.timing(blinkValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, index * 1000);

      return (
        <Animated.View key={index} style={[styles.blinkButton, { opacity: blinkValue }]}>
          <TouchableOpacity onPress={() => setSelectedActivity(button)}>
            <Text style={styles.blinkButtonText}>{button}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    });
  }, [activityOptions]);

  return (
    <View   >
       <TouchableOpacity style={[styles.button, styles.rightTop]}>
          <EnergyBar value={energy}/>
      </TouchableOpacity>
      <Text style={styles.header}>Välj en aktivitet</Text>
      {selectedActivity ? (
        <>
          <Text style={styles.activityText}>Aktivitet: {selectedActivity}</Text>
         {/*  <Text style={styles.activityText}>Energy: {energy}%</Text> */}
          <TouchableOpacity style={styles.refillButton} onPress={refillEnergy}>
            <Text style={styles.refillButtonText}>Övning gjord (10 energi)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedActivity(null)}>
            <Text style={styles.buttonText}>Tillbaka</Text>
          </TouchableOpacity>
        </>
      ) : activityOptions.length > 0 ? (
        <>
          {animatedButtons}
          <TouchableOpacity style={styles.button} onPress={() => setActivityOptions([])}>
            <Text style={styles.buttonText}>Tillbaka</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Animated.View style={[styles.blinkButton, { opacity: blinkAnim }]}>
            <TouchableOpacity onPress={() => setActivityOptions(individualGames)}>
              <Text style={styles.blinkButtonText}>Individuella lekar</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.blinkButton, { opacity: blinkAnim }]}>
            <TouchableOpacity onPress={() => setActivityOptions(socialGames)}>
              <Text style={styles.blinkButtonText}>Sociala lekar</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Tillbaka till Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  activityText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  blinkButton: {
    backgroundColor: "#ADD8E6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  blinkButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  refillButton: {
    backgroundColor: "#90EE90",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  refillButtonText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default ActivitiesScreen;