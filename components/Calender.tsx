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
    const [morningEmotionData, setMorningEmotionData] = useState({});
    const navigation = useNavigation();
    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("evening");
    const [locale, setLocale] = useState("sv");

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
        const loadMorningEmotionData = async () => {
            try {
                const storedMorningEmotionData = await AsyncStorage.getItem('morningEmotionData');
                if(storedMorningEmotionData) {
                    setMorningEmotionData(JSON.parse(storedMorningEmotionData));
                }
            } catch (error) {
                console.log("Failed to load emotion data from Asyncstorage", error);
            }
        };        
        loadEmotionData();
        loadMorningEmotionData();
    }, []);

    const handleCalenderDayPress = (day) => {
        setSelectedDate(day.dateString); 
      };
  
    const handleDayPress = (day) => {
      setSelectedDate(day.dateString); 
      setIsModalVisible(true);
    };

    const emotions = [
        { label: "😊", value: "😊"},
        { label: "❤️", value: "❤️"},
        { label: "😌", value: "😌"},
        { label: "😠", value: "😠"},
        { label: "😢", value: "😢"},
    ];

    const handleSaveEmotion = async () => {
        if (selectedEmotion) {
            let newEmotionData;
      if (selectedTimeOfDay === "evening") {
        newEmotionData = { ...emotionData, [selectedDate]: selectedEmotion };
        try {
          await AsyncStorage.setItem('emotionData', JSON.stringify(newEmotionData));
          setEmotionData(newEmotionData);
          console.log('Evening emotion saved:', selectedEmotion);
        } catch (error) {
          console.error("Failed to save emotion data to AsyncStorage", error);
        }
      } else {
        const newMorningEmotionData = { ...morningEmotionData, [selectedDate]: selectedEmotion };
        try {
          await AsyncStorage.setItem('morningEmotionData', JSON.stringify(newMorningEmotionData));
          setMorningEmotionData(newMorningEmotionData);
          console.log('Morning emotion saved:', selectedEmotion);
        } catch (error) {
          console.error("Failed to save morning emotion data to AsyncStorage", error);
        }
        }
    }
        setIsModalVisible(false);
    }
  
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Dagens datum: {selectedDate}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Morgonkänsla: {morningEmotionData[selectedDate] || "😶"}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Kvällskänsla: {emotionData[selectedDate] || "😶"}
        </Text>
        <Calendar
          onDayPress={handleCalenderDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "purple" },
          }}
          markingType={"multi-dot"}
          firstDay={1}
          locale={locale}
        />
        {selectedDate && (
        <>
        <View style={styles.buttonContainer}>
          <Button
            title="Idag känner jag mig"
            onPress={() => {
              setSelectedTimeOfDay("morning");
              setIsModalVisible(true);
            }}
          />
          <Button
            title="Idag har jag känt mig"
            onPress={() => {
              setSelectedTimeOfDay("evening");
              setIsModalVisible(true);
            }}
          />
          </View>
        </>
      )}       
        <Image 
                //source={{ uri: 'https://static.vecteezy.com/ti/gratis-vektor/t1/6828456-ljusa-smiley-ansikte-emoji-vektor-uttryck-gratis-vector.jpg' }} 
                //style={styles.image}
              />
              <Text style={{ textAlign: "center", fontSize: 150 }}>
          {morningEmotionData[selectedDate] || "😶"}
          {emotionData[selectedDate] || "😶"}
        </Text>

<Modal
animationType="slide"
transparent={true}
visible={isModalVisible}
onRequestClose={() => setIsModalVisible(false)}
>
<View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Idag känner jag mig</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedEmotion(value)}
              items={emotions}
              style={pickerSelectStyles}
            />
            <TouchableOpacity onPress={handleSaveEmotion} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Spara</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Avbryt</Text>
            </TouchableOpacity>
          </View>
        </View>
</Modal>
<View style={styles.hemKnapp}>
        <Button
          title="Tillbaka till Dashboard"
          onPress={() => navigation.navigate("MainPage")}
        />
      </View>
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
  hemKnapp: {
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
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