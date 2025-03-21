import React, { useState, useRef, useEffect, useContext } from 'react';
import { Animated, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import EnergyBar from './EnergyBar';
import usageStats from 'react-native-usage-stats';
import { useUsageStats } from './UsageStatsContext';


// Function to generate a deck of cards
const generateDeck = () => {
  const suits = ['♠', '♣', '♦', '♥'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  let deck: string[] = [];


  for (let suit of suits) {
    for (let value of values) {
      deck.push(value + suit);
    }
  }


  // Shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards
  }


  return deck;
};


// Function to calculate the score of the hand
const calculateScore = (hand: string[]) => {
  let score = 0;
  let aces = 0;


  hand.forEach(card => {
    const value = card.slice(0, -1); // Remove the suit
    if (['J', 'Q', 'K'].includes(value)) {
      score += 10;
    } else if (value === 'A') {
      aces += 1;
      score += 11;
    } else {
      score += parseInt(value);
    }
  });


  // Adjust for aces if the score is over 21
  while (score > 21 && aces) {
    score -= 10;
    aces -= 1;
  }


  return score;
};


const BlackJack = () => {


  const {energy, setEnergy } = useUsageStats();
  const [deck, setDeck] = useState<string[]>(generateDeck());
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [playerCardFlips, setPlayerCardFlips] = useState<any>([]);
  const [dealerCardFlips, setDealerCardFlips] = useState<any>([]);
  const [stand, setStand] = useState(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const startGame = () => {
    const newDeck = generateDeck(); // Generate and shuffle a new deck
    setDeck(newDeck); // Update the deck state


    // Draw initial cards from the shuffled deck
    const playerInitialHand = [newDeck.pop()!, newDeck.pop()!];
    const dealerInitialHand = [newDeck.pop()!, newDeck.pop()!];


    // Update the hands and animations
    setPlayerHand(playerInitialHand);
    setDealerHand(dealerInitialHand);
    setPlayerCardFlips([new Animated.Value(0), new Animated.Value(0)]); // Player card flips
    setDealerCardFlips([new Animated.Value(0), new Animated.Value(0)]); // Dealer card flips


    
    // Reset game state
    setGameOver(false);
    setMessage('');

    
  };

  useEffect(()=> {
    //console.log("BlackJack?", playerHand.length)
    if(calculateScore(playerHand) === 21 && playerHand.length < 3) {
        setMessage("BlackJack!");
       // setEnergy((prevEnergy: number) => prevEnergy + 20)
        setGameOver(true);
        setStand(false)
    }
    //return ()=> {setGameOver(true)};
  }, [startGame]);

  useEffect(()=> {
    if(message === "BlackJack!") {
        console.log("Gain 10 energy")
        setEnergy((prevEnergy: number) => prevEnergy + 10)
    }
  }, [message])


  const playerHit = () => {
    console.log("playerHand0: ", playerHand)
    if (gameOver) return;
    const newCard = deck.pop();
    setPlayerHand(prev => [...prev, newCard!]);


    /* let array = [];
    array.push(newCard)
    playerHand.push(newCard); */


    if(calculateScore(playerHand) > 21) {
      setMessage('Player busts! Dealer wins.');
      console.log("energy: ", energy)
      setEnergy((prevEnergy: number) => prevEnergy - 10)
      setGameOver(true);
    }


    console.log("newCard: ", newCard)


    // Add animation for the new card flip
    setPlayerCardFlips((prevFlips: any) => [...prevFlips, new Animated.Value(0)]);


    // Trigger the card flip animation for the new card
    Animated.timing(playerCardFlips[playerCardFlips.length - 1], {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();


    checkGameStatus();
  };


  const playerStand = () => {
    if (gameOver) return;
    setStand(true);
  
  
    // Local variables to track the dealer's hand and score
    let localDealerHand = [...dealerHand];
    let dealerScore = calculateScore(localDealerHand);
    console.log("Initial dealerScore: ", dealerScore);
  
  
    const drawDealerCard = async () => {
      if (deck.length === 0) {
        setMessage("No more cards left in the deck.");
        setGameOver(true);
        return;
      }
  
  
      // Draw a new card from the deck and add it to the local dealer hand
      const newCard = deck.pop()!;
      localDealerHand.push(newCard);
  
  
      // Calculate the dealer's score after the new card
      dealerScore = calculateScore(localDealerHand);
      console.log("New dealerScore after drawing a card: ", dealerScore);
  
      setDealerHand(localDealerHand);

      await delay(1000)
  
      // Once dealer's score is >= 17, stop drawing cards
      if (dealerScore < 17) {
        // Keep drawing if score is less than 17
        drawDealerCard();
      } else {
        // Update the state once the dealer stops drawing cards
        setDealerHand(localDealerHand);
  
  
        // Now check the final results of the game
        const playerScore = calculateScore(playerHand);
  
  
        if (playerScore > 21) {
          setMessage("Player busts! Dealer wins.");
          setEnergy(prevEnergy => prevEnergy - 10);
        } else if (dealerScore > 21 || playerScore > dealerScore) {
          setMessage("Player wins!");
          setEnergy(prevEnergy => prevEnergy + 5);
        } else if (playerScore === dealerScore) {
          setMessage("It's a tie!");
        } else {
          setMessage("Dealer wins!");
          setEnergy(prevEnergy => prevEnergy - 10);
        }
  
  
        setGameOver(true);
        setStand(false);
      }
    };
  
  
    // Check if the dealer's score is already >= 17 before drawing any cards
    if (dealerScore < 17) {
      drawDealerCard(); // Start drawing cards for the dealer if needed
    } else {
      // If dealer's score is already 17 or greater, proceed with checking the game result
      const playerScore = calculateScore(playerHand);
  
  
      if (playerScore > 21) {
        setMessage("Player busts! Dealer wins.");
        setEnergy(prevEnergy => prevEnergy - 10);
      } else if (dealerScore > 21 || playerScore > dealerScore) {
        setMessage("Player wins!");
        setEnergy(prevEnergy => prevEnergy + 5);
      } else if (playerScore === dealerScore) {
        setMessage("It's a tie!");
      } else {
        setMessage("Dealer wins!");
        setEnergy(prevEnergy => prevEnergy - 10);
      }
  
  
      setGameOver(true);
      setStand(false);
    }
  };
  

  const checkGameStatus = () => {
    const playerScore = calculateScore(playerHand);
    console.log("playerScore", playerScore)
    if (playerScore > 21) {
      setMessage('Player busts! Dealer wins.');
      console.log("energy: ", energy)
      setEnergy((prevEnergy: number) => prevEnergy - 10)
      setGameOver(true);
      setStand(false);
    }
  };


  const cardFlipStyle = (flipAnimation: Animated.Value) => ({
    transform: [
      {
        rotateY: flipAnimation ? flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }) : '0deg',  // Safely handle undefined flipAnimation
      },
    ],
  });

  // Helper function to color cards based on suit
  const getCardColor = (card: string) => {
    const suit = card.slice(-1); // Get the suit (last character of the card)
    if (suit === '♥' || suit === '♦') {
      return 'red';
    }
    return 'black';
  };


  useEffect(()=> {
    console.log("dealerScoreZ: ", calculateScore(dealerHand))
    if(calculateScore(dealerHand) > 21) {
        console.log("player wins")
        setMessage('Dealer busts. Player wins!');
        setEnergy((prevEnergy: number) => prevEnergy + 5)
        setGameOver(true);
        setStand(false);
    }
  }, [dealerHand])


  useEffect(()=> {
    startGame();
  }, [])

  useEffect(() => {
    const animationValue = new Animated.Value(0);
  
    // Trigger animation
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  
    // Cleanup on component unmount
    return () => {
      // You can stop or reset animations here if needed
      animationValue.stopAnimation(); // This prevents memory leaks
    };
  }, []); // Empty dependency array ensures this effect runs only on mount/unmount
  

  useEffect(()=> {
    if(calculateScore(playerHand) > 21) {
        setMessage("Player busts.");
        setEnergy((prevEnergy: number) => prevEnergy - 10)
        console.log("energy: ", energy)
        setGameOver(true);
        setStand(false);
    }
  }, [playerHand])

  return (
    <View style= {styles.energyBar}>
        <EnergyBar value={energy} ></EnergyBar>
    <View style={styles.container}>
       
      <Text style={styles.header}>Blackjack</Text>


      {/* Dealer's hand */}
      <Text style={styles.cardText}>Dealer's Hand: {dealerHand.join(', ')}</Text>
      <Text style={styles.cardText}>Dealer's Score: {calculateScore(dealerHand)}</Text>
      <View style={styles.cardContainer}>
        {dealerHand.map((card, index) => (
          <Animated.View
            key={index}
            style={[styles.card, cardFlipStyle(dealerCardFlips[index])]}>
            <Text style={[styles.cardText, { color: getCardColor(card) }]}>{card}</Text>
          </Animated.View>
        ))}
      </View>


      {/* Player's hand */}
      <Text style={styles.cardText}>Your Hand: {playerHand.join(', ')}</Text>
      <View style={styles.cardContainer}>
        {playerHand.map((card, index) => (
          <Animated.View
            key={index}
            style={[styles.card, cardFlipStyle(playerCardFlips[index])]}>
            <Text style={[styles.cardText, { color: getCardColor(card) }]}>{card}</Text>
          </Animated.View>
        ))}
      </View>


      {/* Score */}
      <Text style={styles.cardText}>Your Score: {calculateScore(playerHand)}</Text>


      {/* Game message */}
      {gameOver && <Text style={styles.message}>{message}</Text>}


      <View style={styles.buttons}>
        {gameOver ? (
          <TouchableOpacity onPress={startGame} style={styles.button}>
            <Text style={styles.buttonText}>Start over</Text>
          </TouchableOpacity>
        ) : (
            
          <>
          {stand ? (<><Text style={styles.message}>Player stands. Dealers turn</Text></>) : ( <><TouchableOpacity onPress={playerHit} style={styles.button}>
              <Text style={styles.buttonText}>Hit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playerStand} style={styles.button}>
              <Text style={styles.buttonText}>Stand</Text>
            </TouchableOpacity></>)}
            
          </>
        )}
      </View>
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      top: -90,
      flex: 1,
      justifyContent: 'flex-start',  // Align everything to the top
      alignItems: 'center',  // Center horizontally
      backgroundColor: '#f5f5f5',
      padding: 5,  // Padding around the edges
      overflow: 'visible',
    },
    energyBar: {
      position: 'absolute',
      top: -90, // Adjust position if necessary
      width: '100%',
    },
    header: {
      fontSize: 28,  // Slightly smaller header for mobile
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',  // Center header text
    },
    cardText: {
      fontSize: 14,  // Moderate font size for better readability on mobile
      marginBottom: 10,
      textAlign: 'center',  // Center align text
    },
    message: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      color: 'red',
      textAlign: 'center',  // Ensure message is centered
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',  // Buttons take up most of the screen width but with space on the sides
      marginTop: 20,  // Space from other elements
    },
    button: {
      backgroundColor: '#2196F3',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 5,
      margin: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,  // Ensure a consistent button height
      flex: 1,  // Allow buttons to take equal width
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',  // Center the button text
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'center',  // Center cards horizontally
      marginTop: 10,
      marginBottom: 10,  // Space below the cards
      flexWrap: 'wrap',  // Allow cards to wrap onto a new line if needed
    },
    card: {
      width: 60,  // Slightly larger cards for easier visibility
      height: 100,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
    },
  });
  


export default BlackJack;