import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { getUserId, loadActivities, saveActivities } from './firebaseServices';

interface Activity {
  description: string;
  time: string;
}

interface Activities {
  [key: string]: Activity[];
}

const ParentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activities, setActivities] = useState<Activities>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activity, setActivity] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');

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

  const addActivity = (): void => {
    if (!userId || activity.trim() === '' || hour.trim() === '' || minutes.trim() === '') return;
    const time: string = `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    const updatedActivities: Activities = {
      ...activities,
      [selectedDate]: [...(activities[selectedDate] || []), { description: activity, time }],
    };
    setActivities(updatedActivities);
    saveActivities(userId, updatedActivities);
    setActivity('');
    setHour('');
    setMinutes('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={Object.keys(activities).reduce((acc: Record<string, { marked: boolean; dotColor: string }>, date) => {
          acc[date] = { marked: true, dotColor: 'blue' };
          return acc;
        }, {})}
      />
      <Text>Activities for {selectedDate}:</Text>
      <FlatList
        data={activities[selectedDate] || []}
        renderItem={({ item }) => <Text>{item.time} - {item.description}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Add Activity for {selectedDate}</Text>
          <TextInput
            placeholder="Activity description"
            value={activity}
            onChangeText={setActivity}
            style={styles.input}
          />
          <View style={styles.timeInputContainer}>
            <TextInput
              placeholder="HH"
              value={hour}
              onChangeText={setHour}
              keyboardType="numeric"
              style={styles.timeInput}
            />
            <Text>:</Text>
            <TextInput
              placeholder="MM"
              value={minutes}
              onChangeText={setMinutes}
              keyboardType="numeric"
              style={styles.timeInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={addActivity} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    activityText: { fontSize: 16, marginVertical: 2 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, width: 200, marginVertical: 10, padding: 5 },
    timeInputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    timeInput: { borderWidth: 1, width: 50, textAlign: 'center', marginHorizontal: 5, padding: 5 },
    buttonContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    buttonSpacer: { width: 20 },
  });



export default ParentPage;
