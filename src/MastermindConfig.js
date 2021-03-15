import SelectBtn from "./customWidgets/select-btn"
import React from "react";
import "./MastermindConfig.css"

const MMconfig = ({onCloseConfig, 
    nHoles, onNumberOfHolesChange,
    nColors, onNumberOfColorsChange,
    clickSelectMode, onSelectModeChange
    }) => {


    // const languages = [
    //     {
    //         id: "fr",
    //         img: "fr_img.png"
    //     },
    //     {
    //         id: "en", 
    //         img: "en_img.png"
    //     }
    // ]

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
    // console.log("HOLES")
    // console.log(nHoles)
    // console.log(numberHoles.indexOf(nHoles));

    return (
        <div className="mm-config">
            <button className="mm-btn-close-config" onClick={()=>onCloseConfig()}>
                <img src={process.env.PUBLIC_URL+"/reset_img.svg"} className="btn-img" draggable="false"/>
            </button>
            {/* <section>
                <h3>Which language do you want to use?</h3>
                <SelectBtn 
                items={languages.map(e=>{
                    return (
                        <img src={process.env.PUBLIC_URL+"/"+e.img}
                        draggable="false"/>
                    )
                })}
                onChange={(a, i)=>{
                    // console.log(a)
                    // console.log(i)
                }}
                class_container="slct-container"
                class_item="slct-item"
                selected={0}
                multiselect={false}
                />
            </section> */}
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
        </div>
    )
}


export default MMconfig;