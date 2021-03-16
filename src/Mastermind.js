import React, {useState, useEffect} from "react";
import "./Mastermind.css"
import {randomGuess, checkGuess} from "./game_logic/utils";
import {MMtoGuess, MMguessBuilder, MMguess} from "./MastermindComp";
import "./MastermindComp.css";
// import close_img from "./img/reset_img.svg"
// import SelectBtn from "./customWidgets/select-btn"
import {MMconfig, MMbuttons} from "./MastermindConfig";

const randomId = () => {
    return (
        Math.random().toString(36)
            .replace("0.", "").substring(0, 10)
    )
}

const allColors = [
    "transparent",
    "blue",
    "green",
    "yellow",
    "red",
    "black",
    "white",
    "violet",
    "turquoise",
]


const Mastermind = () => {
    // const [language, setLanguage] = useState("fr");
    const [gameDim, setGameDim] = useState({
        holes: 4,
        colors: 6,
    })
    // console.log(allColors.slice(0, gameDim.colors+1))
    const [colorOptions, setColorOptions] = useState(allColors.slice(0, gameDim.colors+1))
    useEffect(()=>{
        setColorOptions(allColors.slice(0, gameDim.colors+1))
    }, [gameDim, setColorOptions])

    const [toGuess, setToGuess] = useState(randomGuess(gameDim.holes, gameDim.colors))
    const [gameOver, setGameOver] = useState(false);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState(Array(gameDim.holes).fill(0))
    const [configOpen, setConfigOpen] = useState(false)
    const [timerVisible, setTimerVisible] = useState(true)
    const [clickSelectMode, setClickSelectMode] = useState(false)
    
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

    const onToggleConfig = (open=true) => {
        console.log("opening config")
        setConfigOpen(open);
    }

    return (
        <div className="mm-app-container">
            {/* <div className="title">
                MindMaster
            </div>           */}
            <div className="game-config-container">
                {configOpen ? (
                <MMconfig
                    onCloseConfig={()=>onToggleConfig(false)}
                    nHoles={gameDim.holes}
                    onNumberOfHolesChange={(n)=>(setGameDim(gd=>({...gd, holes:n})))}
                    nColors={gameDim.colors}
                    onNumberOfColorsChange={(n)=>(setGameDim(gd=>({...gd, colors:n})))}
                    clickSelectMode={clickSelectMode ? 1 : 0}
                    onSelectModeChange={(c)=>(setClickSelectMode(c))}
                    timerVisible={timerVisible}
                    onChangeTimerVisibility={(v)=>setTimerVisible(v)}
                />
                 ) : (
            
                
                <div className="game">
                    {/* main buttons */}
                    <MMbuttons 
                        onNewGame={onNewGame}
                        onGiveUp={onGiveUp}
                        onOpenConfig={()=>{onToggleConfig(true)}}
                    />
                    {/* to guess object */}
                    <MMtoGuess
                        toGuess={gameOver ? toGuess : Array(toGuess.length).fill(0) }
                        colorOptions={colorOptions}
                        timerVisible={timerVisible}
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
                        clickSelectMode={clickSelectMode}
                    />}
                </div>
                )}
            </div>
        </div>
    )
}



export default Mastermind;