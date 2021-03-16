import { useEffect, useState } from "react"

const MMcolor = ({color, nomargin=false}) => {
    const bgColor = color === "transparent" ? "grey" : "transparent"
    return (
        <button className="one-color-btn"
        style={{backgroundColor:bgColor, margin: nomargin ? "0" : "2px"}}

        >
        {
            color === "transparent" ? null :
            <img src={process.env.PUBLIC_URL+"/"+color+"_pin.png"} className="one-color-img" draggable="false"/>
        }
        </button>
    )
}


const MMtoGuess = ({toGuess, colorOptions, time, timerVisible}) => {
    // const [showTimer, setShowTimer] = useState(true);
    const formatTime = (t) => {
        let m = Math.floor(t / 60);
        let s = t - m * 60;
        if (m < 10) m = "0"+m
        if (s < 10) s = "0"+s
        return m+":"+s
    }
    console.log(time)
    console.log(timerVisible)
    return (
        <div className="mm-toguess-container">
        {/* <div className="one-color-row">
            <button onClick={onGiveUp}> 
            <img src={process.env.PUBLIC_URL+"/show_img.svg"} className="btn-img" draggable="false"/>
            </button>    
            <button onClick={onNewGame}>
            <img src={process.env.PUBLIC_URL+"/restart_img.svg"} className="btn-img" draggable="false"/>
            </button>    

            <button onClick={()=>setShowTimer(t=>!t)}>
                <img src={showTimer ? (
                    process.env.PUBLIC_URL+"/notimer_img.svg" 
                    ): ( process.env.PUBLIC_URL+"/timer_img.svg" 
                    )} className="btn-img" draggable="false"/>
            </button>
            <button onClick={()=>onOpenConfig()}>
                <img src={process.env.PUBLIC_URL+"/config_img.svg"} className="btn-img" draggable="false"/>
            </button>
        </div> */}
        {
                timerVisible ? <div className="mm-timer"><div>{formatTime(time)}</div></div> : null
        }
        <div className="one-color-row mm-rounded-border">
            {
                toGuess.map((e, i)=> {
                    return (
                        <MMcolor key={i} color={colorOptions[e]}/>
                    )
                })
            }
        </div>
        </div>
    )
}

const MMcolorEditor = ({colorOptions, color, setColor, clickMode=false}) => {
    return (
        clickMode ? (
            <MMcolorEditor_click colorOptions={colorOptions} color={color} setColor={setColor} /> 
        ):(
            <MMcolorEditor_drag colorOptions={colorOptions} color={color} setColor={setColor} /> 
        ) 
    )
}

const MMcolorEditor_click = ({colorOptions, color, setColor}) => {
    const [editOn, setEditOn] = useState(false);
    useEffect(()=> {
        const listenerAction = (e) => {
            setEditOn(false);
        }
        window.addEventListener("click", listenerAction)
        return (
            () => {
                window.removeEventListener("click", listenerAction)
            }
        )
    }, [setEditOn])
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
            onClick={(e)=> {
                console.log(editOn)
                if (editOn) {
                    console.log("here")
                    const id = getElemIdFromMouseEvent(e)
                    console.log(id)
                    if (id) setColor(id)
                    setEditOn(false)
                } else {
                    setTimeout(()=>setEditOn(true), 0)
                }
            }}
        >
            <MMcolor color={colorOptions[color]} />
            { editOn ? (
                <div className="mm-color-options" style={{['--m']: colorOptions.length-1, ['--tan']: 0.40}}>
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
                                <MMcolor color={e} nomargin={true}/>
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

const MMcolorEditor_drag = ({colorOptions, color, setColor}) => {
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
    // console.log(colorOptions)
    return (
        <div className="mm-editable-color" 
            onTouchStart={()=> {
                setEditOn(true)
            }}
            onMouseDown={()=> {
                setEditOn(true)
            }}
            onTouchMove={(e)=> {
                const id = getElemIdFromTouchEvent(e)
                if (id) setColor(id) 
            }}
            onMouseMove={(e)=>{
                if (editOn) {
                    const id = getElemIdFromMouseEvent(e)
                    if (id) setColor(id) 
                }
            }}
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
            <MMcolor color={colorOptions[color]} />
            { editOn ? (
                <div className="mm-color-options" style={{['--m']: colorOptions.length-1, ['--tan']: 0.40}}>
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
                                <MMcolor color={e} nomargin={true} />
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

const MMguessBuilder = ({colorOptions, colors, setColors, onSubmit, clickSelectMode=false}) => {
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
                    <img src={process.env.PUBLIC_URL+"/play_img.svg"} className="btn-img" draggable="false"/>
                </button>  
            </div>
            <div className="mm-ingame-btns-left">
                <button
                    onClick={onReset}
                > 
                    <img src={process.env.PUBLIC_URL+"/reset_img.svg"} className="btn-img" draggable="false"/>
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
                        clickMode={clickSelectMode}
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
        <div className="one-row">
        <MMguessRes gcgp={result.gcgp} gcbp={result.gcbp} />
        <div className="one-color-row">
            {
                colors.map((e, i) => {
                    return (
                        <MMcolor key={i}
                        color={colorOptions[e]} />
                    )
                })
            }
        </div>
        <div className="mm-number"><p>{number}</p></div>
        </div>
    )
}


export {MMtoGuess, MMguessBuilder, MMguess};