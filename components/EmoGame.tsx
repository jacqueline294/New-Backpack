import React, { useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EmoGame = () => {
  const navigation = useNavigation();  

  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
  });
  const [feelingResult, setFeelingResult] = useState("");
  const [isFeelingResultVisible, setIsFeelingResultVisible] = useState(false);

  const emotions = [
    { label: "😊glad", value: "😊"},
    { label: "❤️", value: "❤️"},
    { label: "😌", value: "😌"},
    { label: "😠", value: "😠"},
    { label: "😢", value: "😢"},
];

  const handleSubmit = () => {
    if(answers.q1 == true && answers.q2 == true && answers.q3 == true && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == true && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[1].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == true && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[2].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == true && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[3].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == false && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[4].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == false && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == false && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[1].value);}
    if(answers.q1 == true && answers.q2 == true && answers.q3 == false && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[2].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == true && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[3].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == true && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[4].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == true && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == true && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == false && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[1].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == false && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == false && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == true && answers.q2 == false && answers.q3 == false && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == true && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[1].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == true && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[2].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == true && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[3].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == true && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[4].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == false && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == false && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == false && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == true && answers.q3 == false && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == true && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == true && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == true && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == true && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == false && answers.q4 == true && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == false && answers.q4 == true && answers.q5 == false) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == false && answers.q4 == false && answers.q5 == true) {setFeelingResult (emotions[0].value);}
    if(answers.q1 == false && answers.q2 == false && answers.q3 == false && answers.q4 == false && answers.q5 == false) {setFeelingResult (emotions[1].value);}
    }

  const handleAnswer = (q: string, value: boolean) => {    
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [q]: value,
    }));
    
  };

  const renderAnswerText = (q: string) => {
    const answer = answers[q];
    
    return answer ? "True" : "False";
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "left", fontSize: 20 }}>
        - Har det varit roligt i skolan idag?
      </Text>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("q1", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("q1", false)}
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
          onPress={() => handleAnswer("q2", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("q2", false)}
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
          onPress={() => handleAnswer("q3", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("q3", false)}
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
          onPress={() => handleAnswer("q4", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("q4", false)}
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
          onPress={() => handleAnswer("q5", true)}
        >
          <Text style={styles.buttonText}>Ja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("q5", false)}
        >
          <Text style={styles.buttonText}>Nej</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={ 
            handleSubmit
          }
        >
          <Text style={styles.buttonText}>Idag känner jag mig troligen</Text>
        </TouchableOpacity>
      </View>

      
      <Text>
          Question 1: {renderAnswerText("q1")}{"\n"}        
          Question 2: {renderAnswerText("q2")}{"\n"}        
          Question 3: {renderAnswerText("q3")}{"\n"}
          Question 4: {renderAnswerText("q4")}{"\n"}        
          Question 5: {renderAnswerText("q5")}
        </Text>
      <Text style={{ textAlign: "center", fontSize: 200 }}>
       {feelingResult }
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
