import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import SignUp from "./SignUp";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native"




const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const navigation = useNavigation();
  
    const handleDayPress = (day) => {
      setSelectedDate(day.dateString); // Store the selected date
    };
  
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Selected Date: {selectedDate}
        </Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "blue" },
          }}
          markingType={"multi-dot"}
        />
            <Button
            title="Hem test"   
            onPress={() => navigation.navigate("MainPage")}         
        />
      </View>
    );
  };

  
  export default MyCalendar;