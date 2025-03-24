import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Calendar, DateData } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getUserId } from "./firebaseServices";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firbaseConfig";

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ParentPage: undefined;
};

type Activity = { title: string; date: string; time: string };

const ParentPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [activities, setActivities] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
  const [dailyActivities, setDailyActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bedtime, setBedtime] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = getUserId(setUserId);
    return () => unsubscribe();
  }, []);

  const handleDayPress = async (day: DateData) => {
    setSelectedDate(day.dateString);
    if (userId) {
      const docRef = doc(db, "children", userId, "calendar", day.dateString);
      const docSnap = await getDoc(docRef);
      setDailyActivities(docSnap.exists() ? docSnap.data().activities : []);
    }
    setModalVisible(true);
  };

  const addActivity = async () => {
    if (!userId || !selectedDate || newActivity.trim() === "") return;

    const activity: Activity = {
      title: newActivity,
      date: selectedDate,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedActivities = [...dailyActivities, activity];
    setDailyActivities(updatedActivities);

    const docRef = doc(db, "children", userId, "calendar", selectedDate);
    await setDoc(docRef, { activities: updatedActivities }, { merge: true });

    setActivities({ ...activities, [selectedDate]: { marked: true, dotColor: "blue" } });
    setNewActivity("");
  };

  const saveBedtime = async () => {
    if (!userId) return;
    const bedtimeString = bedtime.toTimeString().split(" ")[0].slice(0, 5);
    const docRef = doc(db, "children", userId);
    await setDoc(docRef, { bedtime: bedtimeString }, { merge: true });
    alert("Bedtime set successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parent Calendar</Text>

      <Calendar onDayPress={handleDayPress} markedDates={activities} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Activities for {selectedDate}</Text>

            <FlatList
              data={dailyActivities}
              renderItem={({ item }) => (
                <Text style={styles.activityItem}>{`${item.time} - ${item.title}`}</Text>
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
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.bedtimeSection}>
        <Button title="Set Bedtime" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={bedtime}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setBedtime(selectedDate);
            }}
          />
        )}
        <Text style={styles.bedtimeText}>Selected Bedtime: {bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Button title="Save Bedtime" onPress={saveBedtime} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Logga ut" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

export default ParentPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" },
  modalHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10, borderRadius: 5 },
  activityItem: { padding: 5, fontSize: 16 },
  bedtimeSection: { marginTop: 20, alignItems: "center" },
  bedtimeText: { marginVertical: 10, fontSize: 16 },
});
