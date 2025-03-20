import React, { useState } from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native"
import Svg, { Path, G } from "react-native-svg"

const colors = ["red", "blue", "green", "yellow", "purple", "black"]

const images = [
  {
    id: 1,
    name: "Stjärna",
    path: "M50,15 L61,35 H85 L66,50 L75,75 L50,60 L25,75 L34,50 L15,35 H39 Z",
  },
  {
    id: 2,
    name: "Hjärta",
    path: "M50,80 C30,50 0,30 25,10 C40,-10 50,10 50,10 C50,10 60,-10 75,10 C100,30 70,50 50,80 Z",
  },
  {
    id: 3,
    name: "Fisk",
    path: "M20,50 Q40,30 60,50 Q40,70 20,50 M60,50 L80,40 M60,50 L80,60",
  },
  {
    id: 4,
    name: "Sportbil",
    path: "M10,60 Q30,40 70,40 Q90,60 90,70 L10,70 Z M20,70 Q25,75 30,70 M70,70 Q75,75 80,70",
  },
  {
    id: 5,
    name: "Buss",
    path: "M10,60 H90 V30 H10 Z M20,60 Q25,70 30,60 M70,60 Q75,70 80,60",
  },
  { id: 6, name: "Hus", path: "M10,70 H90 V40 L50,10 L10,40 Z" },
  {
    id: 7,
    name: "Slott",
    path: "M20,70 H80 V40 L70,20 L50,40 L30,20 L20,40 Z",
  },
  {
    id: 8,
    name: "Ballong",
    path: "M50,20 Q70,40 50,60 Q30,40 50,20 M50,60 L50,80",
  },
]

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState("black")
  const [lines, setLines] = useState<{ color: string; points: string }[]>([])

  const startDrawing = (evt: any) => {
    const { locationX, locationY } = evt.nativeEvent
    setLines([
      ...lines,
      { color: selectedColor, points: `${locationX},${locationY}` },
    ])
  }

  const continueDrawing = (evt: any) => {
    const { locationX, locationY } = evt.nativeEvent
    setLines((prevLines) => {
      const newLines = [...prevLines]
      if (newLines.length > 0) {
        newLines[newLines.length - 1].points += ` ${locationX},${locationY}`
      }
      return newLines
    })
  }

  return (
    <View style={styles.container}>
      {!selectedImage ? (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => setSelectedImage(item.path)}
            >
              <Text style={styles.imageText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.canvas}>
          <Svg
            width={300}
            height={300}
            viewBox="0 0 100 100"
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={startDrawing}
            onResponderMove={continueDrawing}
          >
            <G>
              <Path
                d={selectedImage}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              {lines.map((line, index) => (
                <Path
                  key={index}
                  d={`M${line.points}`}
                  stroke={line.color}
                  strokeWidth="3"
                  fill="none"
                />
              ))}
            </G>
          </Svg>
          <View style={styles.colorPalette}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setLines([])}
          >
            <Text style={styles.resetText}>Rensa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedImage(null)}
          >
            <Text style={styles.backText}>Tillbaka</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  imageButton: {
    padding: 20,
    margin: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },
  imageText: { color: "#fff", fontSize: 18 },
  canvas: { alignItems: "center", marginTop: 20 },
  colorPalette: { flexDirection: "row", marginTop: 10 },
  colorButton: { width: 40, height: 40, margin: 5, borderRadius: 20 },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF5733",
    borderRadius: 5,
  },
  resetText: { color: "#fff", fontSize: 18 },
  backButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  backText: { color: "#fff", fontSize: 18 },
})

export default App
