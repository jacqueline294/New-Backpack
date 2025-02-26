import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EmoGame = () => {
  const navigation = useNavigation();

  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
  });
  const [feelingResult, setFeelingResult] = useState(false);
  const emotions = [
    { label: "😊", value: "😊"},
    { label: "❤️", value: "❤️"},
    { label: "😌", value: "😌"},
    { label: "😠", value: "😠"},
    { label: "😢", value: "😢"},
];

  const handleAnswer = (question, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "left", fontSize: 20 }}>
        - Har det varit roligt i skolan idag?
      </Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question1", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question1", false)}
        >
          <Text style={styles.buttonText}>Nej</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "left", fontSize: 20 }}>
        - Har du lärt dig spännande nya saker idag?
      </Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question2", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question2", false)}
        >
          <Text style={styles.buttonText}>Nej</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "left", fontSize: 20 }}>
        - Har du ätit god mat idag?
      </Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question3", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question3", false)}
        >
          <Text style={styles.buttonText}>Nej</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "left", fontSize: 20 }}>
        - Har du bråkat idag?
      </Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question4", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question4", false)}
        >
          <Text style={styles.buttonText}>Nej</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: "left", fontSize: 20 }}>
        - Har du haft en jobbig dag?
      </Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question5", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("question5", false)}
        >
          <Text style={styles.buttonText}>Nej</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "left", fontSize: 20 }}>
        Idag känner du dig troligen:
      </Text>
      
      <Text style={styles.answerText}>
          Question 1: {renderAnswerText("question1")}
        </Text>
      <Text style={{ textAlign: "center", fontSize: 200 }}>
      😶
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Tillbaka"
          onPress={() => navigation.navigate("EmoSpace")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default EmoGame;
