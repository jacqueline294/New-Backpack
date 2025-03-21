import React, { useEffect, useState, SetStateAction } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, ScrollView, Touchable,  } from "react-native";
import { useNavigation } from "@react-navigation/native";


const questions = {
    START: {
        text: "OJDÅ. VERKAR SOM ATT DU INTE RIKTIGT VET HUR DU KÄNNER DIG. LÅT OSS FÖRSÖKA KOMMA FRAM TILL DET TILLSAMMANS. HUR HAR DIN DAG VARIT?",
        choices: [
          { text: "DEN HAR VARIT JÄTTEKUL", next: "BRA" },
          { text: "DET HAR VARIT JOBBIGT", next: "DÅLIG" },
          { text: "JAG VET INTE RIKTIGT", next: "VETINTE1" },
          { text: "JAG VILL SPELLA MEMORY", next: "MemoryMatch" },
        ],
      },
    BRA: {
        text: "KUL ATT HÖRA ATT DU MÅR BRA. VILL DU BERÄTTA VAD DET ÄR SOM GJORT ATT DET KÄNNS BRA",
        choices: [
          { text: "NÅGON HAR VARIT VÄLDIGT SNÄLL MOT MIG", next: "SNÄLL" },
          { text: "DET HÄNDE EN VÄLDIGT ROLIG SAK IDAG", next: "ROLIG" },
          { text: "JAG VET INTE RIKTIGT", next: "VETINTE2" },
          { text: "ANSWER 4 NAVIGATION", next: "activity" },
        ],
      },
    DÅLIG: {
      text: "DET VAR TRÅKIGT ATT HÖRA. VAD ÄR DET SOM HAR VARIT SÅ DÅLIGT?",
      choices: [
        { text: "NÅGON HAR VARIT DUM MOT MIG", next: "DUM" },
        { text: "DET HAR HÄNT EN LEDSAM SAK", next: "LEDSEN" },
        { text: "JAG VET INTE RIKIGT", next: "VETINTE3" },
      ],
    },
    SNÄLL: {
      text: "VAD KUL ATT HÖRA. VEM VAR DET? vET DU VARFÖR PERSONEN VAR SNÄLL?",
      choices: [
        { text: "DET VAR EN KOMPIS SOM VAR SNÄLL TILLBAKA FÖR VAD JAG GJORT", next: "PH" },
        { text: "DET VAR EN KOMPIS MEN VET INTE VARFÖR", next: "PH" },
        { text: "DET VAR EN I MIN FAMILJ SOM VAR SNÄLL TILLBAKA FÖR VAD JAG GJORT", next: "PH" },
        { text: "DET VAR EN I MIN FAMILJ MEN VET INTE VARFÖR", next: "PH" },
        { text: "DET VAR NÅGON ANNAN SOM VAR SNÄLL TILLBAKA", next: "PH" },
        { text: "DET VAR NÅGON ANNAN MEN VET INTE VARFÖR", next: "PH" },
        { text: "ANSWER 4 NAVIGATION", next: "activity" },
      ],
    },
    ROLIG: {
      text: "JIPPIE! VAD FÖR ROLIGT ÄR DET SOM HAR HÄNT?",
      choices: [
        { text: "DET HAR VARIT KALAS", next: "KALAS" },
        { text: "HAR VARIT EN ROLIG SKOLAKTIVITET", next: "SKOLAKTIVITET" },
        { text: "VARIT PÅ UTFLYKT MED KOMPISAR ELLER FAMILJ", next: "UTFLYKT" },
      ],
    },
  
      
}


const EmoInvestigation = () => {
    const navigation = useNavigation();

    // State to track the current dialogue node
    const [currentNode, setCurrentNode] = useState('START');
    const [history, setHistory] = useState([]); // To store the history of dialogues
  
    // Function to handle when a choice is selected
    const handleChoice = (nextNode) => {
      if (nextNode === "MemoryMatch") {
        navigation.navigate("MemoryMatch");
      } else {
      // Push the current node to history before transitioning
      setHistory([...history, currentNode]);
      setCurrentNode(nextNode);
      }
    };
  
    // Function to handle going back to the previous dialogue node
    const handleBack = () => {
      if (history.length > 0) {
        const previousNode = history[history.length - 1];
        setHistory(history.slice(0, -1)); // Remove the last node from history
        setCurrentNode(previousNode);
      }
    };
  
    // Get the current dialogue node
    const currentQuestion = questions [currentNode];
  
    return (
      <View style={styles.container}>        
        <ScrollView>
          {/* Displaying the dialogue text */}
          <Text style={styles.dialogueText}>{currentQuestion.text}</Text>  
          {/* Displaying the choices */}
          {currentQuestion.choices.map((choice, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              key={index}
              title={choice.text}
              onPress={() => handleChoice(choice.next)}
            </TouchableOpacity>
            
          ))}
        </ScrollView>
        <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EmoSpace")}
            >
              <Text style={styles.backButton}>TILLBAKA TILL EMOSPACE</Text>
        </TouchableOpacity>
        {history.length > 0 && (
          <Button
            title="Back"
            onPress={handleBack}
          />
        )}
      </View>
    );  
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  dialogueText: {
    fontSize: 25,
  },
  optionButton: {
    height: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
    height: 0,
  },
  backButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});

export default EmoInvestigation; 