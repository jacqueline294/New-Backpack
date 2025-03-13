import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native"
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler"

const GRID_SIZE: number = 4
const WINNING_TILE: number = 2048

type Board = number[][]
type Cell = { row: number; col: number }

const generateEmptyBoard = (): Board =>
  Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0))

const getRandomEmptyCell = (board: Board): Cell | null => {
  let emptyCells: Cell[] = []
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) emptyCells.push({ row: rowIndex, col: colIndex })
    })
  })
  return emptyCells.length > 0
    ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
    : null
}

const addRandomTile = (board: Board): Board => {
  let newBoard = board.map((row) => [...row])
  const cell = getRandomEmptyCell(newBoard)
  if (cell) newBoard[cell.row][cell.col] = Math.random() < 0.9 ? 2 : 4
  return newBoard
}

const moveLeft = (board: Board): Board => {
  let newBoard = board.map((row) => {
    let filteredRow = row.filter((num: number) => num)
    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2
        filteredRow[i + 1] = 0
      }
    }
    return [
      ...filteredRow.filter((num: number) => num),
      ...Array(GRID_SIZE - filteredRow.length).fill(0),
    ]
  })
  return newBoard
}

const rotateBoard = (board: Board): Board => {
  return board[0].map((_, colIndex) =>
    board.map((row) => row[colIndex]).reverse()
  )
}

const moveBoard = (direction: number, board: Board): Board => {
  let newBoard: Board = [...board]
  for (let i = 0; i < direction; i++) newBoard = rotateBoard(newBoard)
  newBoard = moveLeft(newBoard)
  for (let i = 0; i < (4 - direction) % 4; i++) newBoard = rotateBoard(newBoard)
  return newBoard
}

const checkGameOver = (board: Board): boolean => {
  if (getRandomEmptyCell(board)) return false
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (
        (col < GRID_SIZE - 1 && board[row][col] === board[row][col + 1]) ||
        (row < GRID_SIZE - 1 && board[row][col] === board[row + 1][col])
      ) {
        return false
      }
    }
  }
  return true
}

const checkWin = (board: Board): boolean => {
  return board.some((row) => row.includes(WINNING_TILE))
}

export default function Game2048() {
  const [board, setBoard] = useState<Board>(addRandomTile(generateEmptyBoard()))

  const handleSwipe = (direction: number) => {
    let newBoard = moveBoard(direction, board)
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      newBoard = addRandomTile(newBoard)
      setBoard(newBoard)
      if (checkWin(newBoard)) Alert.alert("Bra jobbat!", "Du nådde 2048!")
      if (checkGameOver(newBoard)) Alert.alert("Game Over", "Try again!")
    }
  }

  const resetGame = () => {
    setBoard(addRandomTile(generateEmptyBoard()))
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={({ nativeEvent }) => {
          const { translationX, translationY } = nativeEvent
          if (Math.abs(translationX) > Math.abs(translationY)) {
            handleSwipe(translationX > 0 ? 1 : 3)
          } else {
            handleSwipe(translationY > 0 ? 2 : 0)
          }
        }}
      >
        <View style={styles.gameBoard}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View key={colIndex} style={styles.tile}>
                  <Text style={styles.tileText}>{cell !== 0 ? cell : ""}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </PanGestureHandler>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.buttonText}>Återställ</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf8ef",
  },
  gameBoard: { backgroundColor: "#bbada0", padding: 10, borderRadius: 10 },
  row: { flexDirection: "row" },
  tile: {
    width: 70,
    height: 70,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee4da",
    borderRadius: 5,
  },
  tileText: { fontSize: 24, fontWeight: "bold" },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8f7a66",
    borderRadius: 5,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
})
