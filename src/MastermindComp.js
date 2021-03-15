import { useEffect, useState } from "react"
// import Select from "react-select"
// import play_img from "./img/play_img.svg"
// import reset_img from "./img/reset_img.svg"
// import restart_img from "./img/restart_img.svg"
// import show_img from "./img/show_img.svg"
// import timer_img from "./img/timer_img.svg"
// import notimer_img from "./img/notimer_img.svg"
// import config_img from "./img/config_img.svg"

const MMcolor = ({color, nomargin=false}) => {
    const bgColor = color === "transparent" ? "grey" : "transparent"
    return (
        <button className="one-color-btn"
        style={{backgroundColor:bgColor, margin: nomargin ? "0" : "2px"}}

        >
        {
            color === "transparent" ? null :
            // <img src={process.env.PUBLIC_URL+"/"+color+"_pin.png"} className="one-color-img" draggable="false" width="40px" height="40px"/>
            <img src={process.env.PUBLIC_URL+"/"+color+"_pin.png"} className="one-color-img" draggable="false"/>
        }
        </button>
    )
}


const MMtoGuess = ({toGuess, colorOptions, onNewGame, onGiveUp, time, onOpenConfig}) => {
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
            <button onClick={()=>{
                const r = document.querySelector(":root");
                let v = parseInt(window.getComputedStyle(r).getPropertyValue('--refwidth'));
                if (v > 25) v--;
                console.log(v);
                r.style.setProperty("--refwidth", v+"px");
            }}> 
                <img src={process.env.PUBLIC_URL+"/zoomout_img.svg"} className="btn-img" draggable="false"/>
            </button>    
            <button onClick={onGiveUp}> 
                <img src={process.env.PUBLIC_URL+"/show_img.svg"} className="btn-img" draggable="false"/>
            </button>
            <button onClick={onNewGame}>
            <img src={process.env.PUBLIC_URL+"/restart_img.svg"} className="btn-img" draggable="false"/>
            </button>    
            {
                showTimer ? <div className="mm-timer"><div>{formatTime(time)}</div></div> : null
            }
            <button onClick={()=>setShowTimer(t=>!t)}>
                <img src={showTimer ? (
                    process.env.PUBLIC_URL+"/notimer_img.svg" 
                    ): ( process.env.PUBLIC_URL+"/timer_img.svg" 
                    )} className="btn-img" draggable="false"/>
            </button>
            <button onClick={()=>onOpenConfig()}>
                <img src={process.env.PUBLIC_URL+"/config_img.svg"} className="btn-img" draggable="false"/>
            </button>
            <button onClick={()=>{
                const r = document.querySelector(":root");
                let v = parseInt(window.getComputedStyle(r).getPropertyValue('--refwidth'));
                if (v < 50) v++;
                r.style.setProperty("--refwidth", v+"px");
            }}> 
                <img src={process.env.PUBLIC_URL+"/zoomin_img.svg"} className="btn-img" draggable="false"/>
            </button> 
        </div>
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
        <div className="one-color-row">
            <div className="mm-ingame-btns-right"><div className="mm-number">{number}</div></div>
            <MMguessRes gcgp={result.gcgp} gcbp={result.gcbp} />
            {
                colors.map((e, i) => {
                    return (
                        <MMcolor key={i}
                        color={colorOptions[e]} />
                    )
                })
            }
        </div>
    )
}


export {MMtoGuess, MMguessBuilder, MMguess};