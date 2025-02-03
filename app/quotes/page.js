"use client";
import { useState, useEffect } from "react";

const friends = ["Therese", "Mikkel", "Mark", "Rikke", "Oguz", "Thai", "Ravn", "Kristian", "Hjeds", "Rejse"];

const quotes = [
  { quote: "Du får tissemand! Du får tissemand! Du ramte ham for tissemand! Let's go!", author: "Mikkel" },
  { quote: "I die.", author: "Ravn" },
  { quote: "Let's rotate!", author: "Oguz" },
  { quote: "Jeg må hellere lige skynde mig at sige nogle homofobiske ting, så jeg kan nå at komme med i den næste video du laver.", author: "Mikkel" },
  { quote: "***** Er det okay hvis jeg har en Onlyfans?", author: "Thai" },
  { quote: "Hun er en 10/10'er, men hun tror at du er fra Mexico.", author: "Mikkel" },
  { quote: "Øhh, jeg glor ikke lige på dit klamme banner lige nu.", author: "Kristian" },
  { quote: "Ét gumlekort.", author: "Mark" },
  { quote: "Nu skal jeg prøve at være ligesom Oguz... Jeg skal tænke ligesom Oguz... Jeg skal få den samme energi... Jeg skal få den samme had til bacon!", author: "Ravn" },
  { quote: "Det er bare to KSI's mod hinanden", author: "Hjeds" },
  { quote: "Altså, hvis jeg fik hende der, så havde jeg bare kommet online, og så ville vi bare havet spillet 3 runder mere jo...", author: "Thai" },
  { quote: "Jeg er unranked. Det vil sige, at jeg faktisk er pro.", author: "Kristian" },
  { quote: "Uha...", author: "Mark" },
  { quote: "Han er jo ligesom dig Thai... fucking forfærdelig.", author: "Mark" },
  { quote: "Han har jo også pads på skulderen jo... Ka' ikk' skyde igennem det... Nej nej... Jeg skal hvis bruge penge på de skins der...", author: "Ravn" },
  { quote: "Jeg kan droppe nogen... Skal jeg dræbe nogen- Eller ikk' dræbe nogen.", author: "Ravn" },
  { quote: "Fuck the Americans! Kill the Americans! Kill the Americans! Good job, Comrade.", author: "Oguz" },
  { quote: "Seriøst, nogle gange så ville jeg ønske I kunne se mig mens jeg sidder og spiller Valorant, fordi jeg er fucking sjov. Jeg sad og throwede gang signs mens jeg sagde det der...", author: "Therese" },
  { quote: "AD!", author: "Rejse" },
  { quote: "Hvad sker der for den knockbock de har?", author: "Ravn" },
  { quote: "Jeg kan godt forstå at det er 'OG'... Det var den gang de ikke kunne finde ud af noget...", author: "Ravn" },
  { quote: "Warum bewegst du deine maus so ruckartig?", author: "Rikke" },
  { quote: "Jeg er ikke god til at lave venner, okay?", author: "Thai" },
  { quote: "Jeg har stjålet Marks ball", author: "Oguz" },
  { quote: "Yo den har autisme, red den!", author: "Mikkel" },
  { quote: "Whaaat? Jeg kan godt huske den her. Det var den gang man ikke kunne finde ud af noget... Det kan jeg stadigvæk ikke, men...", author: "Ravn" },
  { quote: "Er du en luder? I don't judge, hvad end der får mad på bordet, ikk'?", author: "Ravn" },
  { quote: "Jeg kunne godt finde på at cooke en lille chinese lady...", author: "Therese" },
];

const getDailyQuote = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const dayIndex = Math.floor(startOfDay.getTime() / (1000 * 60 * 60 * 24)) % quotes.length;
  return quotes[dayIndex];
};

export default function GuessThatQuote() {
  const [dailyQuote, setDailyQuote] = useState(null);
  const [guesses, setGuesses] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");
  const [remainingOptions, setRemainingOptions] = useState(friends);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [correctGuess, setCorrectGuess] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const storedGameState = localStorage.getItem("gameState");
    const storedStreak = localStorage.getItem("streak");
    if (storedStreak) setStreak(parseInt(storedStreak, 10));
    setDailyQuote(getDailyQuote());
    if (storedGameState) {
      const parsedState = JSON.parse(storedGameState);
      if (parsedState.date === new Date().toDateString()) {
        setGameState(parsedState);
        setMessage(parsedState.message);
        setGuesses(parsedState.guesses);
        setRemainingOptions(parsedState.remainingOptions);
        setIncorrectGuesses(parsedState.incorrectGuesses);
        setCorrectGuess(parsedState.correctGuess);
        return;
      }
    }
  }, []);

  const handleGuess = (author) => {
    if (!author) return;
    let newMessage = "";
    let newStreak = streak;
    let newGuesses = guesses + 1;
    let newIncorrectGuesses = [...incorrectGuesses];
    let newRemainingOptions = remainingOptions.filter(name => name !== author);
    let newCorrectGuess = correctGuess;

    if (author === dailyQuote.author) {
      newMessage = "Correct!";
      newStreak += 1;
      newCorrectGuess = author;
    } else {
      newIncorrectGuesses.push(author);
      if (newGuesses >= 5) {
        newMessage = "Out of guesses! Streak reset.";
        newStreak = 0;
      } else {
        newMessage = "Incorrect, try again.";
      }
    }

    setMessage(newMessage);
    setGuesses(newGuesses);
    setStreak(newStreak);
    setIncorrectGuesses(newIncorrectGuesses);
    setRemainingOptions(newRemainingOptions);
    setCorrectGuess(newCorrectGuess);
    localStorage.setItem("streak", newStreak);

    const gameState = {
      date: new Date().toDateString(),
      message: newMessage,
      guesses: newGuesses,
      remainingOptions: newRemainingOptions,
      incorrectGuesses: newIncorrectGuesses,
      correctGuess: newCorrectGuess,
    };
    
    // Comment out the following line to disable persistent game state for testing purposes
    // localStorage.setItem("gameState", JSON.stringify(gameState));
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Guess That Quote</h1>
      {dailyQuote && (
        <>
          <p className="text-lg italic mb-4">"{dailyQuote.quote}"</p>
          <select
            onChange={(e) => handleGuess(e.target.value)}
            className="p-2 border rounded bg-white text-black"
            disabled={guesses >= 5 || message === "Correct!"}
          >
            <option value="">Select a name</option>
            {remainingOptions.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <p className="mt-4 font-semibold">{message}</p>
          <p className="mt-2">Streak: {streak}</p>
          <p>Guesses left: {5 - guesses}</p>
          <div className="mt-4">
            {correctGuess && <p className="text-green-500 font-bold">{correctGuess}</p>}
            {incorrectGuesses.map((name, index) => (
              <p key={index} className="text-red-500 line-through">{name}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
