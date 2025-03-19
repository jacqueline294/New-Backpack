import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Calendar, DateData } from "react-native-calendars";
import { getUserId, loadActivities, saveActivities } from "./firebaseServices";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firbaseConfig";

// Define navigation stack types
type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ParentPage: undefined;
};

const ParentPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [activities, setActivities] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
  const [dailyActivities, setDailyActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = getUserId((uid) => {
      setUserId(uid);
      if (uid) {
        loadActivities(uid).then((userActivities) => {
          // Convert user activities to marked dates
          const markedDates = Object.keys(userActivities || {}).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: "blue" };
            return acc;
          }, {} as Record<string, { marked: boolean; dotColor: string }>);
          setActivities(markedDates);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle selecting a date
  const handleDayPress = async (day: DateData) => {
    setSelectedDate(day.dateString);
    if (userId) {
      const docRef = doc(db, "parents", userId, "calendar", day.dateString);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDailyActivities(docSnap.data()?.activities || []);
      } else {
        setDailyActivities([]);
      }
    }
  };

  // Add Activity
  const addActivity = async () => {
    if (!userId || !selectedDate || newActivity.trim() === "") return;

    const updatedActivities = [...dailyActivities, newActivity];
    setDailyActivities(updatedActivities);

    const docRef = doc(db, "parents", userId, "calendar", selectedDate);
    await setDoc(docRef, { activities: updatedActivities }, { merge: true });

    setActivities({ ...activities, [selectedDate]: { marked: true, dotColor: "blue" } });
    setNewActivity("");
  };

  // Delete Activity
  const deleteActivity = async (index: number) => {
    if (!userId || !selectedDate) return;

    const updatedActivities = dailyActivities.filter((_, i) => i !== index);
    setDailyActivities(updatedActivities);

    const docRef = doc(db, "parents", userId, "calendar", selectedDate);
    await setDoc(docRef, { activities: updatedActivities }, { merge: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Parent Page!</Text>

      {/* Calendar */}
      <Calendar onDayPress={handleDayPress} markedDates={activities} />

      {selectedDate && (
        <View style={styles.activitySection}>
          <Text style={styles.subHeader}>Activities for {selectedDate}</Text>
          <FlatList
            data={dailyActivities}
            renderItem={({ item, index }) => (
              <View style={styles.activityItem}>
                <Text>{item}</Text>
                <Button title="Delete" onPress={() => deleteActivity(index)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Activity"
            value={newActivity}
            onChangeText={setNewActivity}
          />
          <Button title="Add Activity" onPress={addActivity} />
        </View>
      )}

      {/* Logout Button */}
      <Button title="Logga ut" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default ParentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  activitySection: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: 200,
    marginVertical: 10,
    padding: 5,
    textAlign: "center",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 250,
    marginVertical: 5,
  },
});
