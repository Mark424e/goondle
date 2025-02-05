"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/header";

const friends = [
  "Therese",
  "Mikkel",
  "Mark",
  "Rikke",
  "Oguz",
  "Thai",
  "Ravn",
  "Kristian",
  "Hjeds",
  "Rejse",
];

const quotes = [
  {
    quote:
      "Du får tissemand! Du får tissemand! Du ramte ham for tissemand! Let's go!",
    author: "Mikkel",
    hint: "VALORANT",
  },
  {
    quote:
      "Jeg må hellere lige skynde mig at sige nogle homofobiske ting, så jeg kan nå at komme med i den næste video du laver.",
    author: "Mikkel",
    hint: "Discord",
  },
  {
    quote: "***** Er det okay hvis jeg har en Onlyfans?",
    author: "Thai",
    hint: "Fortnite",
  },
  {
    quote: "Hun er en 10/10'er, men hun tror at du er fra Mexico.",
    author: "Mikkel",
    hint: "Discord",
  },
  {
    quote: "Øhh, jeg glor ikke lige på dit klamme banner lige nu.",
    author: "Kristian",
    hint: "VALORANT",
  },
  { quote: "Ét gumlekort.", author: "Mark", hint: "Discord" },
  {
    quote:
      "Nu skal jeg prøve at være ligesom Oguz... Jeg skal tænke ligesom Oguz... Jeg skal få den samme energi... Jeg skal få den samme had til bacon!",
    author: "Ravn",
    hint: "Discord",
  },
  {
    quote: "Det er bare to KSI's mod hinanden",
    author: "Hjeds",
    hint: "Discord",
  },
  {
    quote:
      "Altså, hvis jeg fik hende der, så havde jeg bare kommet online, og så ville vi bare havet spillet 3 runder mere jo...",
    author: "Thai",
    hint: "VALORANT",
  },
  {
    quote: "Jeg er unranked. Det vil sige, at jeg faktisk er pro.",
    author: "Kristian",
    hint: "Discord",
  },
  { quote: "Uha...", author: "Mark", hint: "Phasmophobia" },
  {
    quote: "Han er jo ligesom dig Thai... fucking forfærdelig.",
    author: "Mark",
    hint: "VALORANT",
  },
  {
    quote:
      "Han har jo også pads på skulderen jo... Ka' ikk' skyde igennem det... Nej nej... Jeg skal hvis bruge penge på de skins der...",
    author: "Ravn",
    hint: "Fortnite",
  },
  {
    quote:
      "Jeg kan droppe nogen... Skal jeg dræbe nogen- Eller ikk' dræbe nogen.",
    author: "Ravn",
    hint: "VALORANT",
  },
  {
    quote:
      "Fuck the Americans! Kill the Americans! Kill the Americans! Good job, Comrade.",
    author: "Oguz",
    hint: "Unturned",
  },
  {
    quote:
      "Seriøst, nogle gange så ville jeg ønske I kunne se mig mens jeg sidder og spiller Valorant, fordi jeg er fucking sjov. Jeg sad og throwede gang signs mens jeg sagde det der...",
    author: "Therese",
    hint: "VALORANT",
  },
  { quote: "AD!", author: "Rejse", hint: "VALORANT" },
  {
    quote: "Hvad sker der for den knockbock de har?",
    author: "Ravn",
    hint: "Minecraft",
  },
  {
    quote:
      "Jeg kan godt forstå at det er 'OG'... Det var den gang de ikke kunne finde ud af noget...",
    author: "Ravn",
    hint: "Fortnite",
  },
  {
    quote: "Warum bewegst du deine maus so ruckartig?",
    author: "Rikke",
    hint: "VALORANT",
  },
  {
    quote: "Jeg er ikke god til at lave venner, okay?",
    author: "Thai",
    hint: "VALORANT",
  },
  { quote: "Jeg har stjålet Marks ball", author: "Oguz", hint: "Fortnite" },
  {
    quote: "Yo den har autisme, red den!",
    author: "Mikkel",
    hint: "Bloons TD 6",
  },
  {
    quote:
      "Whaaat? Jeg kan godt huske den her. Det var den gang man ikke kunne finde ud af noget... Det kan jeg stadigvæk ikke, men...",
    author: "Ravn",
    hint: "Fortnite",
  },
  {
    quote:
      "Er du en luder? I don't judge, hvad end der får mad på bordet, ikk'?",
    author: "Mikkel",
    hint: "VALORANT",
  },
  {
    quote: "Jeg kunne godt finde på at cooke en lille chinese lady...",
    author: "Therese",
    hint: "VALORANT",
  },
];

const getDailyQuote = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const dayIndex =
    Math.floor(startOfDay.getTime() / (1000 * 60 * 60 * 24)) % quotes.length;
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
  const [hint, setHint] = useState(null);
  const [selectedName, setSelectedName] = useState("Select a name");

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
        setHint(parsedState.hint);
        return;
      }
    }
  }, []);

  const handleGuess = (author) => {
    if (!author || author === "Select a name") return;
    let newMessage = "";
    let newStreak = streak;
    let newGuesses = guesses + 1;
    let newIncorrectGuesses = [...incorrectGuesses];
    let newRemainingOptions = remainingOptions.filter(
      (name) => name !== author
    );
    let newCorrectGuess = correctGuess;
    let newHint = hint;

    if (author === dailyQuote.author) {
      newMessage = "Correct!";
      newStreak += 1;
      newCorrectGuess = author;
    } else {
      newIncorrectGuesses.push(author);
      if (newGuesses === 3) {
        newHint = dailyQuote.hint;
      }
      if (newGuesses >= 5) {
        newMessage = "Womp womp. The person was " + dailyQuote.author;
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
    setHint(newHint);
    setSelectedName("Select a name");
    localStorage.setItem("streak", newStreak);

    const gameState = {
      date: new Date().toDateString(),
      message: newMessage,
      guesses: newGuesses,
      remainingOptions: newRemainingOptions,
      incorrectGuesses: newIncorrectGuesses,
      correctGuess: newCorrectGuess,
      hint: newHint,
    };

    localStorage.setItem("gameState", JSON.stringify(gameState));
  };

  return (
    <>
      <Header></Header>
      <div className="flex items-center">
        <div className="p-6 max-w-xl mx-auto text-center">
          <div className="flex items-center justify-center border-b pb-6">
            <img
              src={
                streak > 0 ? "./active_streak.gif" : "./not_active_streak.png"
              }
              alt="Streak status"
              className="w-8"
            />
            <span className="absolute text-lg font-bold text-black mt-5">
              {streak}
            </span>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4">Guess The Gooner Quote</h1>
            {dailyQuote && (
              <>
                <div className=" bg-slate-500/25 p-5 rounded-xl mb-4">
                  <p className="text-lg italic">"{dailyQuote.quote}"</p>
                </div>
                <select
                  value={selectedName}
                  onChange={(e) => handleGuess(e.target.value)}
                  className="p-2 border rounded bg-white text-black"
                  disabled={guesses >= 5 || message === "Correct!"}
                >
                  <option>Select a name</option>
                  {remainingOptions.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <p className="mt-4 font-semibold">{message}</p>
                <p className="mt-2 italic text-blue-500">
                  {guesses < 3
                    ? `Hint in ${3 - guesses} guess`
                    : `Hint: ${hint}`}
                </p>
                <p>Guess remaining: {5 - guesses}</p>
                <div className="mt-4">
                  {correctGuess && (
                    <p className="text-green-500 font-bold">{correctGuess}</p>
                  )}
                  {incorrectGuesses.map((name, index) => (
                    <p key={index} className="text-red-500 line-through">
                      {name}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
