import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { getUserId, loadActivities, saveActivities } from './firebaseServices';

interface Activity {
  description: string;
  time: string;
  completed: boolean;
}

interface Activities {
  [key: string]: Activity[];
}

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activities, setActivities] = useState<Activities>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = getUserId((uid: string | null) => {
      setUserId(uid);
      if (uid) {
        loadActivities(uid).then((data: Activities) => setActivities(data));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDayPress = (day: DateData): void => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const markActivityDone = (date: string, index: number): void => {
    if (!userId) return;
    const updatedActivities = { ...activities };
    if (updatedActivities[date] && updatedActivities[date][index]) {
      updatedActivities[date][index].completed = true;
      setActivities(updatedActivities);
      saveActivities(userId, updatedActivities);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={Object.keys(activities).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: 'blue' };
          return acc;
        }, {} as Record<string, { marked: boolean; dotColor: string }>)}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Activities for {selectedDate}:</Text>
          <FlatList
            data={activities[selectedDate] || []}
            renderItem={({ item, index }) => (
              <View style={styles.activityItem}>
                <Text style={[styles.activityText, item.completed && styles.completedText]}>
                  {item.time} - {item.description} {item.completed ? '(Done)' : ''}
                </Text>
                {!item.completed && (
                  <Button title="Mark Done" onPress={() => markActivityDone(selectedDate, index)} />
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  activityItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 },
  activityText: { fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: 'gray' },
});

export default CalendarScreen;
