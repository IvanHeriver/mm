import React, {useState} from "react";
import "./Mastermind.css"
import {randomGuess, checkGuess} from "./game_logic/utils";
import MMconfig from "./MMconfig";
import {MMtoGuess, MMguessBuilder, MMguess} from "./MastermindComp";
import "./MastermindComp.css";
import ih_cross_o from "./img/ih_cross_o.svg"
import ih_bars from "./img/ih_bars.svg"

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

    const [configOn, setConfigOn] = useState(false);

    const onNewGame = () => {
        setGuesses([])
        setCurrentGuess(Array(gameDim.holes).fill(0))
        setToGuess(randomGuess(gameDim.holes, gameDim.colors))
        setGameOver(false)
    }

    const onGiveUp = () => {
        setGameOver(true)
    }
    const onSubmitGuess = (g) => {
        const guessRes = checkGuess(g, toGuess)
        if (guessRes.gcgp === toGuess.length) {
            setGameOver(true);
        }
        setGuesses(pG => {
            return ([...pG, {g: g, r:guessRes}])
        })
    }

    

    return (
        <div className="mm-app-container" config={configOn.toString()}>
            <div className="title">
                Mastermind
            </div>          
            {/* <button className="toggle-config" onClick={()=>setConfigOn(p=>!p)}>
                {configOn ? (
                <img src={ih_cross_o} 
                    className="mm-img-config"
                />
                ) : (
                    <img src={ih_bars} 
                    className="mm-img-config"
                />
                )
                }
            </button> */}
            <div className="game-config-container">
                <div className="config">
                {/* <MMconfig
                    holes={gameDim.holes}
                    colors={gameDim.colors}
                    colorOptions={colorOptions}
                /> */}
                </div>
                <div className="game">
                    {/* to guess object */}
                    <MMtoGuess
                    toGuess={gameOver ? toGuess : Array(toGuess.length).fill(0) }
                    colorOptions={colorOptions}
                    onNewGame={onNewGame}
                    onGiveUp={onGiveUp}
                    />
                    {/* guesses */}
                    {guesses.map((e, i)=> {
                        return (
                            <MMguess key={i}
                            colors={e.g}
                            result={e.r}
                            colorOptions={colorOptions} />
                        )
                    })}
                    {/* new guess */}
                    {gameOver ? null : <MMguessBuilder
                        // nHoles={toGuess.length}
                        // colorOptions={colorOptions}
                        // onSubmit={onSubmitGuess}
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