import ColorCard from "./ColorCard";
import Description from "./Description";
import { useState, useEffect } from "react";
import Header from "./Header";
import "./App.css";

function App() {
  const initialState = {
    isPlaying: false,
    score: 0,
    isFlashing: false,
  };
  const [state, setstate] = useState(initialState);
  const [flashingColor, setflashingColor] = useState("");
  const [colorStack, setcolorStack] = useState([]);
  const [userInput, setuserInput] = useState([]);
  const colors = ["red", "green", "yellow", "blue"];

  const onPlayClick = () => {
    setstate({
      ...state,
      isPlaying: true,
      isFlashing: true,
    });
    startGame();
  };
  const timeout = (millis) => {
    return new Promise((resolve) => setTimeout(resolve, millis));
  };
  async function startGame() {
    let newColor = colors[Math.floor(Math.random() * 4)];
    let newColorStack = [...colorStack, newColor];
    for (let i = 0; i < newColorStack.length; i++) {
      await timeout(1000);
      setflashingColor(newColorStack[i]);
      await timeout(1000);
      setflashingColor("");
    }
    setcolorStack(newColorStack);
    setuserInput([]);
  }
  async function onColorDivClick(value) {
    if (colorStack.length > 0) {
      setstate({ ...state, isFlashing: false });
      let newUserInput = [...userInput, value];
      let allmatched = true;
      for (let i = 0; i < newUserInput.length; i++) {
        if (colorStack[i] !== newUserInput[i]) {
          allmatched = false;
        }
      }
      if (allmatched) {
        if (newUserInput.length === colorStack.length) {
          setstate({ ...state, isFlashing: true, score: colorStack.length });
          await timeout(500);
          startGame();
        } else {
          setuserInput(newUserInput);
        }
      } else {
        setstate({ ...initialState });
        setuserInput([]);
        setcolorStack([]);
        // setuserInput([]);
        setflashingColor("");
        alert("Nice Game, Try Again!");
      }
    }
  }
  return (
    <div className="container">
      <Header />
      <div className="wrapper">
        {colors.map((value) => {
          return (
            <ColorCard
              key={value}
              flash={state.isFlashing && flashingColor === value}
              color={value}
              clickHandler={() => onColorDivClick(value)}
            />
          );
        })}
        {!state.isPlaying && (
          <div onClick={onPlayClick} className="playBtn">
            Play
          </div>
        )}
        {state.isPlaying && <div className="score">{state.score}</div>}
      </div>
      <Description />
    </div>
  );
}

export default App;
