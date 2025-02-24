import React, { useEffect, useState } from "react";
import { Image, Button, View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import SignUp from "./SignUp";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native"
import RNPickerSelect from "react-native-picker-select"
import AsyncStorage from "@react-native-async-storage/async-storage";




const Calender = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [emotionData, setEmotionData] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const loadEmotionData = async () => {
            try {
                const storedEmotionData = await AsyncStorage.getItem('emotionData');
                if(storedEmotionData) {
                    setEmotionData(JSON.parse(storedEmotionData));
                }
            } catch (error) {
                console.log("Failed to load emotion data from Asyncstorage", error);
            }
        };
        loadEmotionData();
    }, []);

    const calenderDayPress = (day) => {
        setSelectedDate(day.dateString);
      };
  
    const handleDayPress = (day) => {
      setSelectedDate(day.dateString); 
      setIsModalVisible(true);
    };

    const emotions = [
        { label: "Happy", value: "happy"},
        { label: "Sad", value: "sad"},
        { label: "Angry", value: "angry"},
        { label: "Tired", value: "Tired"},
    ];

    const handleSaveEmotion = async () => {
        if (selectedEmotion) {
            const newEmotionData = {...emotionData, [selectedDate]: selectedEmotion};
            try {
                await AsyncStorage.setItem('emotionData', JSON.stringify(newEmotionData));
                setEmotionData (newEmotionData);
                console.log('Emotion saved:', selectedEmotion);
            } catch(error) {
                console.error("Failed to save emotion data to asyncstorage", error);
            }
        }
        setIsModalVisible(false);
    }
  
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Selected Date: {selectedDate}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Emotion: {emotionData[selectedDate] || "No emotion selected"}
        </Text>
        <Calendar
          onDayPress={calenderDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "purple" },
          }}
          markingType={"multi-dot"}
          firstDay={1}
        />
            <Button
            title="Välj dagens känsla"   
            onPress={handleDayPress}  
                   
        />
        <Button
            title="Hem test"   
            onPress={() => navigation.navigate("MainPage")}         
        />
        <Image 
                source={{ uri: 'https://static.vecteezy.com/ti/gratis-vektor/t1/6828456-ljusa-smiley-ansikte-emoji-vektor-uttryck-gratis-vector.jpg' }} 
                style={styles.image}
              />

<Modal
animationType="slide"
transparent={true}
visible={isModalVisible}
onRequestClose={() => setIsModalVisible(false)}
>
<View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pick an Emotion for {selectedDate}</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedEmotion(value)}
              items={emotions}
              style={pickerSelectStyles}
            />
            <TouchableOpacity onPress={handleSaveEmotion} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Emotion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
</Modal>

      </View>
    );
  };
const styles = StyleSheet.create({  
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      marginBottom: 10,
      width: "100%",
    },
    inputAndroid: {
      fontSize: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      marginBottom: 10,
      width: "100%",
    },
  });
  
  export default Calender;