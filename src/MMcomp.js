import { useEffect, useState } from "react"

const MMcolor = ({color, nomargin=false}) => {
    const bgColor = color === "transparent" ? "grey" : "transparent"
    return (
        <button className="mm-color"
        // style={{backgroundColor:bgColor, margin: nomargin ? "0" : "2px"}}

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
    // console.log(time)
    // console.log(timerVisible)
    return (
        <div className="mm-toguess mm-row">
            <div className="mm-left"></div>
            <div className="mm-timer mm-right">
                {timerVisible ? <div>{formatTime(time)}</div> : null}
            </div>
        <div className="mm-center">
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
    const [editOn, setEditOn] = useState(false);
    let windowEventName = "";
    let onTouchStart = () => {};
    let onMouseDown = () => {};
    let onTouchMove = () => {};
    let onMouseMove = () => {};
    let onTouchEnd = () => {};
    let onMouseUp = () => {};
    let onClick = () => {};

    if (clickMode) {
        onClick = (e)=> {
            if (editOn) {
                console.log("here")
                const id = getElemIdFromMouseEvent(e)
                console.log(id)
                if (id) setColor(id)
                setEditOn(false)
            } else {
                setTimeout(()=>setEditOn(true), 0)
            }
        }
        // onMouseDown = () => {
        //     window.scrollTo(100000, 100000)
        // }
        windowEventName = "click"
    } else {
        onTouchStart = () => {
            setEditOn(true)
            // window.scrollTo(100000, 100000)
        }
        onMouseDown = () => {
            setEditOn(true)
            // console.log("scrolling")
            // window.scrollTo(100000, 100000)
        }
        onTouchMove = (e) => {
            const id = getElemIdFromTouchEvent(e)
            if (id) setColor(id) 
        }
        onMouseMove = (e) => {
            if (editOn) {
                const id = getElemIdFromMouseEvent(e)
                if (id) setColor(id) 
            }
        }
        onTouchEnd = (e)=> {
            const id = getElemIdFromTouchEvent(e)
            if (id) setColor(id)
            setEditOn(false)
        }
        onMouseUp = (e)=> {
            const id = getElemIdFromMouseEvent(e)
            if (id) setColor(id)
        }
        windowEventName = "mouseup"
    }
    
     useEffect(()=> {
        const listenerAction = (e) => {
            setEditOn(false);
        }
        window.addEventListener(windowEventName, listenerAction)
        return (
            () => {
                window.removeEventListener(windowEventName, listenerAction)
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
        <div className="mm-editable-colors" 
            onTouchStart={onTouchStart}
            onMouseDown={onMouseDown}
            onTouchMove={onTouchMove}
            onMouseMove={onMouseMove}
            onTouchEnd={onTouchEnd}
            onMouseUp={onMouseUp}
            onClick={onClick}
        >
            <MMcolor color={colorOptions[color]} />
            { editOn ? (
                <div className="mm-color-picker" style={{['--m']: colorOptions.length-1, ['--tan']: 0.40}}>
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
        <div className="mm-guessbuilder mm-row">
            <div className="mm-right">
                <button onClick={()=>{onSubmit(colors)}}
                    disabled={!isValid}
                > 
                    <img src={process.env.PUBLIC_URL+"/play_img.svg"} className="btn-img" draggable="false"/>
                </button>  
            </div>
            <div className="mm-left">
                <button
                    onClick={onReset}
                > 
                    <img src={process.env.PUBLIC_URL+"/reset_img.svg"} className="btn-img" draggable="false"/>
                </button>  
            </div>
            <div className="mm-center">
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
        </div>
    )
}

const MMguessResPin = ({type}) => {
    return (
        <div className={"mm-res " + type}>
        </div>
    )
}
const MMguessRes = ({gcgp, gcbp}) => {
    const pins = [];
    for (let k = 0; k < gcgp; k++) {
        pins.push("mm-gp")
    }
    for (let k = 0; k < gcbp; k++) {
        pins.push("mm-bp")
    }
    return (
        <div className="mm-results">
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
        <div className="mm-guess mm-row">
        <div className="mm-left">
            <MMguessRes gcgp={result.gcgp} gcbp={result.gcbp} />
        </div>
        <div className="mm-center">
            {
                colors.map((e, i) => {
                    return (
                        <MMcolor key={i}
                        color={colorOptions[e]} />
                    )
                })
            }
        </div>
        <div className="mm-number mm-right">
            <p>{number}</p>
        </div>
        </div>
    )
}


export {MMtoGuess, MMguessBuilder, MMguess};