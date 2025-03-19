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
        ],
      },
    BRA: {
        text: "PLACEHOLDER",
        choices: [
          { text: "ANSWER 1", next: "realName" },
          { text: "ANSWER 2", next: "falseName" },
          { text: "ANSWER 3", next: "noName" },
          { text: "ANSWER 4 NAVIGATION", next: "noName" },
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
      // Push the current node to history before transitioning
      setHistory([...history, currentNode]);
      setCurrentNode(nextNode);
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
    const currentDialogue = questions [currentNode];
  
    return (
      <View style={styles.container}>        
        <ScrollView>
          {/* Displaying the dialogue text */}
          <Text style={styles.dialogueText}>{currentDialogue.text}</Text>  
          {/* Displaying the choices */}
          {currentDialogue.choices.map((choice, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Button
              key={index}
              title={choice.text}
              onPress={() => handleChoice(choice.next)}
            />
            </TouchableOpacity>
            
          ))}
        </ScrollView>
        <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EmoSpace")}
            >
              <Text style={styles.buttonText}>TILLBAKA</Text>
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
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
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
});

export default EmoInvestigation; 