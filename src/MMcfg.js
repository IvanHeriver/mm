import SelectBtn from "./customWidgets/select-btn"
import React from "react";
// import "./MM.css"

const MMbuttons = ({onNewGame, onGiveUp, onOpenConfig}) => {
    return (
        <div className="mm-row">
        <div className="mm-left"></div>
        <div className="mm-right"></div>
        <div className="mm-buttons mm-center">
        <button onClick={onGiveUp}> 
            <img src={process.env.PUBLIC_URL+"/show_img.svg"} className="btn-img" draggable="false"/>
            </button>    
            <button onClick={onNewGame}>
            <img src={process.env.PUBLIC_URL+"/restart_img.svg"} className="btn-img" draggable="false"/>
            </button>    
            <button onClick={()=>onOpenConfig()}>
                <img src={process.env.PUBLIC_URL+"/config_img.svg"} className="btn-img" draggable="false"/>
            </button>
        </div>
        </div>
    )
}

const MMconfig = ({onCloseConfig, 
    nHoles, onNumberOfHolesChange,
    nColors, onNumberOfColorsChange,
    clickSelectMode, onSelectModeChange,
    timerVisible, onChangeTimerVisibility
    }) => {


    const selectionModes = [
        "Click and slide/drag",
        "Click and click"
    ]

    const numberHoles = [
        3, 4, 5, 6, 7, 8
    ]
    const numberColors = [
        3, 4, 5, 6, 7, 8
    ]

    const showTimerOptions = [
        "No", "Yes"
    ]

    return (
        <div className="mm-config">
            <button className="mm-btn-close-config" onClick={()=>onCloseConfig()}>
                <img src={process.env.PUBLIC_URL+"/reset_img.svg"} className="btn-img" draggable="false"/>
            </button>
            <section>
                <h3>How do you want to select the colors?</h3>
                <SelectBtn 
                items={selectionModes.map(e=>{
                    return (
                        <p>{e}</p>
                    )
                })}
                onChange={(a, i)=>{
                    console.log(i)
                    console.log(i[0]===1)
                    onSelectModeChange(i[0]===1)
                }}
                class_container="slct-container"
                class_item="slct-item"
                selected={clickSelectMode}
                multiselect={false}
                />
            </section>
            <section>
                <h3>How many holes do you want ?</h3>
                <p>(will only take effect for the next game)</p>
                <SelectBtn 
                items={numberHoles.map(e=>{
                    return (
                        <p>{e}</p>
                    )
                })}
                onChange={(a, i)=>{
                    onNumberOfHolesChange(numberHoles[i])
                }}
                class_container="slct-container"
                class_item="slct-item"
                selected={numberHoles.indexOf(nHoles)}
                multiselect={false}
                />
            </section>
            <section>
                <h3>How many colors do you want ?</h3>
                <p>(will only take effect for the next game)</p>
                <SelectBtn 
                items={numberColors.map(e=>{
                    return (
                        <p>{e}</p>
                    )
                })}
                onChange={(a, i)=>{
                    onNumberOfColorsChange(numberHoles[i])
                }}
                class_container="slct-container"
                class_item="slct-item"
                selected={numberColors.indexOf(nColors)}
                multiselect={false}
                />
            </section>
            <section>
                <h3>Do you want do see the timer ?</h3>
                <p>(will only take effect for the next game)</p>
                <SelectBtn 
                items={showTimerOptions.map(e=>{
                    return (
                        <p>{e}</p>
                    )
                })}
                onChange={(a, i)=>{
                    console.log(i)
                    onChangeTimerVisibility(i[0]===1)
                }}
                class_container="slct-container"
                class_item="slct-item"
                selected={timerVisible ? 1 : 0}
                multiselect={false}
                />
            </section>
        </div>
    )
}


export {MMconfig, MMbuttons};