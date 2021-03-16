import React, {useState, useEffect} from "react";
import "./MM.css"
import {randomGuess, checkGuess} from "./game_logic/utils";
import {MMtoGuess, MMguessBuilder, MMguess} from "./MMcomp";
import {MMconfig, MMbuttons} from "./MMcfg";
import { createPortal } from "react-dom";

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

const MM = () => {
    // const [language, setLanguage] = useState("fr");
    const [gameDim, setGameDim] = useState({
        holes: 4,
        colors: 6,
    })
    const [tmpNcolors, setTmpNcolors] = useState(6);
    const [tmpNholes, setTmpNholes] = useState(4);

    // console.log(allColors.slice(0, gameDim.colors+1))
    const [colorOptions, setColorOptions] = useState(allColors.slice(0, gameDim.colors+1))
    useEffect(()=>{
        setColorOptions(allColors.slice(0, gameDim.colors+1))
        updateGameLayout();
    }, [gameDim, setColorOptions])
    const onResize = () => {
        updateGameLayout()
    }
    useEffect(()=>{
        window.addEventListener("resize", onResize)
        return (()=>{
            window.removeEventListener("resize", onResize)
        }
        )
    })
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
        console.log("starting timer")
        setTimer(setInterval(()=>{
            setTime(t=>t+1)
        }, 1000))
    }
    const stopTimer = () => {
        console.log("stopping timer")
        clearInterval(timer)
    }

    const onNewGame = () => {
        setGameDim(gd=>({...gd, holes: tmpNholes, colors: tmpNcolors}))
        setGuesses([])
        setCurrentGuess(Array(tmpNholes).fill(0))
        setToGuess(randomGuess(tmpNholes, tmpNcolors))
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
    
    const updateGameLayout = () => {
        const r = document.querySelector(":root");
        const n = gameDim.holes;
        // const W = 40;
        // const w = W / 2;
        const M = 2;
        // const T = (n * (W + 2*M)) + (n * (W / 2 + 2*M)) + (2 * (W + M) );
        // const T = W * (n+n/2+2) + M * (4*n + 2) + 4;
        const T = document.body.clientWidth - 40; 
        const nW = (T - 4 - M * (4*n + 2)) / (n + n/3 + 2)
        const W = Math.min(nW, 40);
        // nW+2nM + 1/2nW + 2nM + 2W + 2M
        // W(n+n/2+2) + 4nM + 2M

        // console.log("*****")
        // console.log(T)
        // console.log(document.body.clientWidth)

        r.style.setProperty("--center-size", (n * (W + 2*M)) + "px");
        r.style.setProperty("--left-size", (n * (W / 2 + 2*M)) + "px");
        r.style.setProperty("--right-size", (2 * (W + M) ) + "px");
        r.style.setProperty("--main-size", W + "px");
        r.style.setProperty("--secondary-size", W / 3 + "px");
    }

    return (
        <div className="mm-container">
            {configOpen ? (
            <MMconfig
                onCloseConfig={()=>onToggleConfig(false)}
                nHoles={gameDim.holes}
                onNumberOfHolesChange={(n)=>(setTmpNholes(n))}
                nColors={gameDim.colors}
                onNumberOfColorsChange={(n)=>(setTmpNcolors(n))}
                clickSelectMode={clickSelectMode ? 1 : 0}
                onSelectModeChange={(c)=>(setClickSelectMode(c))}
                timerVisible={timerVisible}
                onChangeTimerVisibility={(v)=>setTimerVisible(v)}
            />
                ) : (
        
            
            <div className="mm-game">
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
    )
}



export default MM;