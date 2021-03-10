import { useEffect, useState } from "react"
import play_img from "./img/play_img.svg"
import reset_img from "./img/reset_img.svg"
import restart_img from "./img/restart_img.svg"
import show_img from "./img/show_img.svg"
import timer_img from "./img/timer_img.svg"
import notimer_img from "./img/notimer_img.svg"

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
            <img src={process.env.PUBLIC_URL+"/"+color+"_pin.png"} className="one-color-img" draggable="false" width="40px" height="40px"/>
        }
        </button>
    )
}


const MMtoGuess = ({toGuess, colorOptions, onNewGame, onGiveUp, time}) => {
    const [showTimer, setShowTimer] = useState(true);
    const formatTime = (t) => {
        // if (t === 0)  return "00:00"
        let m = Math.floor(t / 60);
        let s = t - m * 60;
        if (m < 10) m = "0"+m
        if (s < 10) s = "0"+s
        return m+":"+s
    }
    return (
        <div className="mm-toguess-container">
        <div className="one-color-row">
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
            {
                showTimer ? <div className="mm-timer"><div>{formatTime(time)}</div></div> : null
            }
            <button onClick={()=>setShowTimer(t=>!t)}>
                <img src={showTimer ? notimer_img : timer_img} className="btn-img" draggable="false"
                style={{
                    width: "100%",
                    height: "100%",
                }}
                />
            </button>
        </div>
        <div className="one-color-row mm-rounded-border">
            {
                toGuess.map((e, i)=> {
                    return (
                        <MMcolor key={i} color={colorOptions[e].color}/>
                    )
                })
            }
        </div>
        </div>
    )
}

const MMcolorEditor = ({colorOptions, color, setColor}) => {
    // const [tmpColor, setTmpColor] = useState(0);
    const [editOn, setEditOn] = useState(false);
    useEffect(()=> {
        const listenerAction = (e) => {
            setEditOn(false);
        }
        window.addEventListener("mouseup", listenerAction)
        return (
            () => {
                window.removeEventListener("mouseup", listenerAction)
            }
        )
    }, [setEditOn])
    const getElemIdFromTouchEvent = (event) => {
        const elem = document.elementFromPoint(
            event.changedTouches[0].clientX,
            event.changedTouches[0].clientY
        )
        if (!elem) return null
        if (!elem.parentElement.parentElement.getAttribute("idkey")) return null
        return(parseInt(elem.parentElement.parentElement.getAttribute("idkey")))
    }
    const getElemIdFromMouseEvent = (event) => {
        const elem = document.elementFromPoint(
            event.clientX,
            event.clientY
        )
        if (!elem) return null
        if (!elem.parentElement.parentElement.getAttribute("idkey")) return null
        return(parseInt(elem.parentElement.parentElement.getAttribute("idkey")))
    }
    return (
        <div className="mm-editable-color" 
            onTouchStart={()=> {
                setEditOn(true)
                // setTmpColor(color)
            }}
            onMouseDown={()=> {
                setEditOn(true)
                // setTmpColor(color)
            }}
            onTouchMove={(e)=> {
                const id = getElemIdFromTouchEvent(e)
                // id ? setColor(id) : setColor(tmpColor)
                if (id) setColor(id) 
            }}
            onMouseMove={(e)=>{
                if (editOn) {
                    const id = getElemIdFromMouseEvent(e)
                    // id ? setColor(id) : setColor(tmpColor)
                    if (id) setColor(id) 
                }
            }}
            // onMouseLeave={(e)=>{
            //     if (editOn) {
            //         setColor(tmpColor)
            //     }
            // }}
            onTouchEnd={(e)=> {
                const id = getElemIdFromTouchEvent(e)
                if (id) setColor(id)
                setEditOn(false)

            }}
            onMouseUp={(e)=> {
                const id = getElemIdFromMouseEvent(e)
                if (id) setColor(id)
            }}
        >
            <MMcolor color={colorOptions[color].color} />
            { editOn ? (
                <div className="mm-color-options" style={{['--m']: 6, ['--tan']: 0.41}}>
                {
                    colorOptions.map((e, i) => {
                        if (i === 0) {
                            return (null)
                        }
                        return (
                            <div key={i}
                            idkey={i}
                            style={{['--i']: i+1}}
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

const MMcolorOptions = ({colorOptions}) => {
    return (
        colorOptions.map((e, i) => {
            if (i === 0) {
                return (null)
            }
            return (
                <div key={i}
                idkey={i}
                >
                    <MMcolor color={e.color} />
                </div>
            )
        })
    )
}

const MMguessBuilder = ({colorOptions, colors, setColors, onSubmit}) => {
    // const [isEditorOpen, setIsEditorOpen] = useState(Array(colors.length).fill(0));
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

const MMguess = ({colors, result, colorOptions, number}) => {
    return (
        <div className="one-color-row">
            <div className="mm-ingame-btns-right"><div className="mm-number">{number}</div></div>
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