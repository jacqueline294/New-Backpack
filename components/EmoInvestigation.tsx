import React, { useEffect, useState, SetStateAction } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, ScrollView, Touchable, Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EnergyBar from "./EnergyBar";
import { useUsageStats } from "./UsageStatsContext";


const questions = {
    START: {
        text: "OJDÅ. VERKAR SOM ATT DU INTE RIKTIGT VET HUR DU KÄNNER DIG. LÅT OSS FÖRSÖKA KOMMA FRAM TILL DET TILLSAMMANS. HUR HAR DIN DAG VARIT?",
        choices: [
          { text: "DEN HAR VARIT JÄTTEKUL", next: "BRA" },
          { text: "DET HAR VARIT JOBBIGT", next: "DÅLIG" },
          { text: "JAG VET INTE RIKTIGT(VETINTE1)", next: "PH" },
          { text: "JAG VILL SPELA MEMORY", next: "MemoryMatch" },
        ],
      },
    BRA: {
        text: "KUL ATT HÖRA ATT DU MÅR BRA. VILL DU BERÄTTA VAD DET ÄR SOM GJORT ATT DET KÄNNS BRA",
        choices: [
          { text: "NÅGON HAR VARIT VÄLDIGT SNÄLL MOT MIG", next: "SNÄLL" },
          { text: "DET HÄNDE EN VÄLDIGT ROLIG SAK IDAG", next: "ROLIG" },
          { text: "JAG VET INTE RIKTIGT(VETINTE2)", next: "PH" },
          { text: "JAG VILL SPELA ENDLESS ALPHABET", next: "EndlessAlphabet" },
        ],
      },
    DÅLIG: {
      text: "DET VAR TRÅKIGT ATT HÖRA. VAD ÄR DET SOM HAR VARIT SÅ DÅLIGT?",
      choices: [
        { text: "NÅGON HAR VARIT DUM MOT MIG", next: "DUM" },
        { text: "DET HAR HÄNT EN LEDSAM SAK", next: "LEDSEN" },
        { text: "JAG VET INTE RIKIGT(VETINTE3)", next: "PH" },
      ],
    },
    SNÄLL: {
      text: "VAD KUL ATT HÖRA. VEM VAR DET? VET DU VARFÖR PERSONEN VAR SNÄLL?",
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
        { text: "DET HAR VARIT KALAS(KALAS)", next: "PH" },
        { text: "HAR VARIT EN ROLIG SKOLAKTIVITET(SKOLAKTIVITET)", next: "PH" },
        { text: "VARIT PÅ UTFLYKT MED KOMPISAR ELLER FAMILJ(UTFLYKT)", next: "PH" },
      ],
    }, 
    DUM: {
      text: "DET VAR INTE KUL ATT HÖRA. VAD HAR HÄNT?",
      choices: [
        { text: "VARIT I BRÅK MED NÅGON", next: "BRÅK" },
        { text: "NÅGON ELLER NÅGRA HAR VARIT TASKIGA(RETNING)", next: "PH" },
      ]
    },
    LEDSEN: {
      text: "DET VAR INTE KUL ATT HÖRA. VAD HAR HÄNT?",
      choices: [
        { text: "NÅGON HAR VARIT TASKIG MOT MIG.(TASKIG)", next: "PH" },
        { text: "DET HAR SKETT EN OLYCKA(OLYCKA)", next: "PH" },
      ]
    },
    PH: {
      text: "Woops, du har kommit till en sida som är work in progress. Dags att börja om.",
      choices: [
        { text: "Tillbaka", next: "START"},
      ]
    },
    BRÅK: {
      text: "DET VAR TRÅKIGT ATT HÖRA. MEN DÅ KANSKE DU KÄNNER DIG ARG ELLER LEDSEN?",
      choices: [
        { text: "ARG", next: "EmoSpace"},
        { text: "LEDSEN", next: "EmoSpace"},
        { text: "GÖR OM", next: "START"},
      ]
    },
}

const EmoInvestigation = () => {
    const navigation = useNavigation();
    const Emmo = "https://cdn.discordapp.com/attachments/1336699609501929482/1351198619306430535/image.png?ex=67de1e86&is=67dccd06&hm=632fd45b6bafe1b97e7f97f7eb3965d55541a62591a071c5e97dd89d0d73ae05&";
    const Energy = useUsageStats().energy;
    const setEnergy =useUsageStats().setEnergy; //to make energy effected by something 1
    // State to track the current dialogue node
    const [currentNode, setCurrentNode] = useState('START');
    const [history, setHistory] = useState([]); // To store the history of dialogues
  
    // Function to handle when a choice is selected
    const handleChoice = (nextNode) => {
      if (nextNode === "MemoryMatch") {
        navigation.navigate("MemoryMatch");
      } else {
        if (nextNode === "EndlessAlphabet") {
          navigation.navigate("EndlessAlphabet");
        } else {
          if (nextNode === "EmoSpace") {
            navigation.navigate("EmoSpace");
          } else {
      // Push the current node to history before transitioning
      setHistory([...history, currentNode]);
      setCurrentNode(nextNode);
          }
        }
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
          <Text style={styles.dialogueText}>{currentQuestion.text}</Text> 
          <Image 
        source={{ uri: Emmo }} 
        style={styles.image}
      />
      <TouchableOpacity style={[styles.button, styles.button]}>
          <EnergyBar value={Energy}/>
      </TouchableOpacity>
          {currentQuestion.choices.map((choice, index) => (
            <TouchableOpacity key={index} onPress={() => handleChoice(choice.next)}>
              <Text style={styles.optionButton}>{choice.text}</Text>              
            </TouchableOpacity>
            
          ))}

          {currentNode === "BRÅK" && (
                    <Text style={{ textAlign: "center", fontSize: 150, }}>
                            {"😠"}
                            {"😢"}
                          </Text>
                )}

        </ScrollView>
        <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EmoSpace")}
            >
              <Text style={styles.optionButton}>TILLBAKA TILL EMOSPACE</Text>
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
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
  dialogueText: {
    fontSize: 15,
  },
  optionButton: {
    padding: 1,
    borderRadius: 5,
    justifyContent: 'flex-end',
    backgroundColor: '#2296f3',
    color: 'white',
    height: 25,
    fontSize: 15,
    margin: 5,
    textAlign: 'center',
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
    backgroundColor: "#fffc8a",
  },
});

export default EmoInvestigation; 