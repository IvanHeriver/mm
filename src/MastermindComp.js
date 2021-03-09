import { useEffect, useState } from "react"
import play_img from "./img/play_img.svg"
import reset_img from "./img/reset_img.svg"
import restart_img from "./img/restart_img.svg"
import show_img from "./img/show_img.svg"

const MMcolor = ({color}) => {
    const bgColor = color === "transparent" ? "grey" : "transparent"
    return (
        // colored div version
        // <div className="one-color"
        // style={{backgroundColor:color}}
        // ></div>
        // image version
        <button className="one-color-btn"
        style={{backgroundColor:bgColor}}
        >
        {
            color === "transparent" ? null :
            <img src={process.env.PUBLIC_URL+"/"+color+"_pin.png"} className="one-color-img" draggable="false"/>
        }
        </button>
    )
}


const MMtoGuess = ({toGuess, colorOptions, onNewGame, onGiveUp}) => {

    return (
        <div className="one-color-row">
            <div className="mm-ingame-btns-left">
                <button onClick={onGiveUp}> 
                <img src={show_img} className="btn-img" draggable="false"
                    style={{
                        width: "90%",
                        height: "90%",
                        paddingLeft: "0px",
                        paddingTop: "2px",
                        
                    }}/>
                </button>    
                <button onClick={onNewGame}>
                <img src={restart_img} className="btn-img" draggable="false"
                    style={{
                        width: "90%",
                        height: "90%",
                        paddingLeft: "0px",
                        paddingTop: "2px"
                    }}/>
                </button>    
            </div>
            {
                toGuess.map((e, i)=> {
                    return (
                        <MMcolor key={i} color={colorOptions[e].color}/>
                    )
                })
            }
        </div>
    )
}

const MMcolorEditor = ({colorOptions, color, setColor}) => {
    const [tmpColor, setTmpColor] = useState(0);
    const [editOn, setEditOn] = useState(false);
    useEffect(()=> {
        const listenerAction = () => {
            setEditOn(false);
        }
        window.addEventListener("mouseup", listenerAction)
        return (
            () => {
                window.removeEventListener("mouseup", listenerAction)
            }
        )
    }, [setEditOn])
    const onMouseDownAction = () => {
        setEditOn(true);
        setTmpColor(color);
    }
    const onMouseUpAction = (i) => {
        setColor(i)
    }
    const onMouseEnterAction = (i) => {
        setColor(i)
    }
    const onMouseLeaveAction = (i) => {
        setColor(tmpColor)
    }
    return (
        <div className="mm-editable-color"
            onMouseDown={onMouseDownAction}
        >
            <MMcolor color={colorOptions[color].color} />
            { editOn ? (
                <div className="mm-color-options">
                {
                    colorOptions.map((e, i) => {
                        if (i === 0) {
                            return (null)
                        }
                        return (
                            <div key={i}
                            className="mm-color-option"
                            onMouseEnter={()=>{onMouseEnterAction(i)}}
                            onMouseLeave={()=>{onMouseLeaveAction(i)}}
                            onMouseUp={()=>{onMouseUpAction(i)}}
                            >
                                <MMcolor color={e.color} />
                            </div>
                        )
                    })
                }
                </div>
            ):(
                null
            )}
        </div>
    )
}

const MMguessBuilder = ({colorOptions, colors, setColors, onSubmit}) => {
    const [isValid, setIsValid] = useState(false);
    useEffect(()=> {
        setIsValid(colors.map((e)=>e!=0).reduce((p, c)=>p && c))
    }, [colors, setIsValid])
    const onReset = () => {
        setColors(Array(colors.length).fill(0))
    }
    return (
        <div className="one-color-row">
            <div className="mm-ingame-btns-right">
                <button onClick={()=>{onSubmit(colors)}}
                    disabled={!isValid}
                > 
                    <img src={play_img} className="btn-img" draggable="false"
                    style={{
                        width: "90%",
                        height: "90%",
                        paddingLeft: "5px",
                        paddingTop: "4px"
                    }}/>
                </button>  
            </div>
            <div className="mm-ingame-btns-left">
                <button
                    onClick={onReset}
                > 
                    <img src={reset_img} className="btn-img" draggable="false"
                    style={{
                        width: "90%",
                        height: "90%",
                        paddingLeft: "0px",
                        paddingTop: "5px"
                    }}/>
                </button>  
            </div>
            {
                colors.map((e, i)=> {
                    return (
                        <MMcolorEditor key={i}
                        colorOptions={colorOptions}
                        color={e}
                        setColor={(c) => {
                            const nC = [...colors]
                            nC[i] = c
                            setColors(nC)
                        }}
                        />
                    )
                })
            }
        </div>
    )
}

const MMguessResPin = ({type}) => {
    return (
        <div className={"mm-res-pin " + type}>
        </div>
    )
}
const MMguessRes = ({gcgp, gcbp}) => {
    const pins = [];
    for (let k = 0; k < gcgp; k++) {
        pins.push("gcgp")
    }
    for (let k = 0; k < gcbp; k++) {
        pins.push("gcbp")
    }
    return (
        <div className="mm-result">
            {
                pins.map((e,i) => {
                    return (
                        <MMguessResPin key={i} type={e} />
                    )
                })
            }
        </div>
    )
}

const MMguess = ({colors, result, colorOptions}) => {
    return (
        <div className="one-color-row">
            <MMguessRes gcgp={result.gcgp} gcbp={result.gcbp} />
            {
                colors.map((e, i) => {
                    return (
                        <MMcolor key={i}
                        color={colorOptions[e].color} />
                    )
                })
            }
        </div>
    )
}
export {MMtoGuess, MMguessBuilder, MMguess};