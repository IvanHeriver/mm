import React, {useState, useEffect} from "react";
import "./Mastermind.css"
import {randomGuess, checkGuess} from "./game_logic/utils";
import {MMtoGuess, MMguessBuilder, MMguess} from "./MastermindComp";
import "./MastermindComp.css";

const randomId = () => {
    return (
        Math.random().toString(36)
            .replace("0.", "").substring(0, 10)
    )
}



const Mastermind = () => {
    const [gameDim, setGameDim] = useState({
        holes: 4,
        colors: 6,
    })
    const [colorOptions, setColorOptions] = useState([
        {
        id: randomId(),
        color: "transparent",
        },
        {
        id: randomId(),
        color: "blue",
        },
        {
        id: randomId(),
        color: "green",
        },
        {
        id: randomId(),
        color: "yellow",
        },
        {
        id: randomId(),
        color: "red",
        },
        {
        id: randomId(),
        color: "black",
        },
        {
        id: randomId(),
        color: "white",
        },
    ])
    const [toGuess, setToGuess] = useState(randomGuess(gameDim.holes, gameDim.colors))
    const [gameOver, setGameOver] = useState(false);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState(Array(gameDim.holes).fill(0))
    
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);

    const resetTimer = () => {
        setTime(0);
    }
    const startTimer = () => {
        setTimer(setInterval(()=>{
            setTime(t=>t+1)
        }, 1000))
    }
    const stopTimer = () => {
        clearInterval(timer)
    }

    const onNewGame = () => {
        setGuesses([])
        setCurrentGuess(Array(gameDim.holes).fill(0))
        setToGuess(randomGuess(gameDim.holes, gameDim.colors))
        setGameOver(false)
        resetTimer();
    }

    const onGiveUp = () => {
        setGameOver(true)
        stopTimer();
    }
    const onSubmitGuess = (g) => {
        if (guesses.length === 0) startTimer();
        const guessRes = checkGuess(g, toGuess)
        if (guessRes.gcgp === toGuess.length) {
            setGameOver(true);
            stopTimer();
        }
        setGuesses(pG => {
            return ([...pG, {g: g, r:guessRes}])
        })
    }

    return (
        <div className="mm-app-container">
            {/* <div className="title">
                MindMaster
            </div>           */}
            <div className="game-config-container">
                <div className="game">
                    {/* to guess object */}
                    <MMtoGuess
                    toGuess={gameOver ? toGuess : Array(toGuess.length).fill(0) }
                    colorOptions={colorOptions}
                    onNewGame={onNewGame}
                    onGiveUp={onGiveUp}
                    time={time}
                    />
                    {/* guesses */}
                    {guesses.map((e, i)=> {
                        return (
                            <MMguess key={i}
                            colors={e.g}
                            result={e.r}
                            colorOptions={colorOptions}
                            number={i + 1}
                             />
                        )
                    })}
                    {/* new guess */}
                    {gameOver ? null : <MMguessBuilder
                        colorOptions={colorOptions}
                        colors={currentGuess}
                        setColors={(c)=>{setCurrentGuess(c)}}
                        onSubmit={onSubmitGuess}
                    />}
                </div>
            </div>
            
        </div>
    )
}


export default Mastermind;