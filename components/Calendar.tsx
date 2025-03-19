import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Button, ImageBackground, Modal } from "react-native";
import { format, addDays, startOfWeek } from "date-fns";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firbaseConfig";
import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const bubbleBackground = require("../assets/bubbles3.png"); // Ensure you have a bubble-themed background in assets

const CalendarView: React.FC<{ parentId: string }> = ({ parentId }) => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);
  const [weekDays, setWeekDays] = useState<{ date: string; day: string }[]>([]);
  const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!parentId) return;
    const fetchCalendar = async () => {
      const calendarRef = collection(db, "parents", parentId, "calendar");
      const querySnapshot = await getDocs(calendarRef);
      let newMarkedDates: Record<string, { marked: boolean; dotColor: string }> = {};
      querySnapshot.forEach((doc) => {
        newMarkedDates[doc.id] = { marked: true, dotColor: "blue" };
      });
      setMarkedDates(newMarkedDates);
    };
    fetchCalendar();
  }, [parentId]);

  useEffect(() => {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = addDays(startOfWeekDate, i);
      return { date: format(day, "yyyy-MM-dd"), day: format(day, "EEE") };
    });
    setWeekDays(days);
  }, []);

  const handleDayPress = async (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
    const docRef = doc(db, "parents", parentId, "calendar", date);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setActivities(docSnap.data()?.activities || []);
    } else {
      setActivities([]);
    }
  };

  const handleActivityComplete = () => {
    setPoints((prevPoints) => prevPoints + 5);
  };

  return (
    <ImageBackground source={bubbleBackground} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Veckovy</Text>
        <FlatList
          horizontal
          data={weekDays}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.bubble, selectedDate === item.date && styles.selectedBubble, item.date === today && styles.todayBubble]}
              onPress={() => handleDayPress(item.date)}
            >
              <Text style={styles.bubbleText}>{item.day}</Text>
              <Text style={styles.bubbleNumber}>{item.date.split("-")[2]}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Modal for Activities */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Dagens Aktiviteter</Text>
              {activities.length > 0 ? (
                <FlatList
                  data={activities}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} style={styles.activityBubble} onPress={handleActivityComplete}>
                      <Text style={styles.activityText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <Text style={styles.noActivitiesText}>Inga aktiviteter för denna dag</Text>
              )}
              <Button title="Stäng" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <Text style={styles.pointsText}>Poäng: {points}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, 
    resizeMode: "stretch", 
    justifyContent: "center" },
  container: { padding: 16, 
    alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", 
    color: "gray",
    marginBottom: 10 },
  bubble: { padding: 20, margin: 6, borderRadius: 50, backgroundColor: "rgba(255, 255, 255, 0.7)", alignItems: "center", justifyContent: "center", width: 80, height: 80 },
  selectedBubble: { backgroundColor: "rgba(173, 216, 230, 0.9)" },
  todayBubble: { backgroundColor: "rgba(255, 165, 0, 0.9)" },
  bubbleText: { fontSize: 18, fontWeight: "bold", color: "#0077b6" },
  bubbleNumber: { fontSize: 22, fontWeight: "bold", color: "#023e8a" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  modalHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  activityBubble: { padding: 15, borderRadius: 50, margin: 5, backgroundColor: "#5cb85c" },
  activityText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  noActivitiesText: { fontSize: 16, fontWeight: "bold", color: "#666", marginVertical: 10 },
  pointsText: { fontSize: 18, fontWeight: "bold", color: "gray", marginTop: 10 },
});

export default CalendarView;
