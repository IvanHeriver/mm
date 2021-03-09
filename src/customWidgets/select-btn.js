import React, {useState, useEffect} from "react";
import "./select-btn.css";

const InitSelectBtn = (n, selected, multiselect) => {
    const selectedItems = Array(n).fill(false);
    if (selected) {
        if (!Array.isArray(selected)) {
            if (Number.isInteger(selected)) {
                selected = [selected]
            } else {
                throw "'selected' must an integer of an array of integer"
            }
        } else {
            if (!multiselect & selected.length != 1) {
                selected = [selected[0]]
            }
        }
        selected.map((e, i) => {
            if (!Number.isInteger(e)) {
                throw "item "+i+" of 'selected' is not an integer"
            }
            selectedItems[e] = true;
        })
    }
    return (selectedItems);
}

const SelectBtn = ({items, onChange, selected=0, multiselect=false}) => {
  
    const [selectedItems, setSelectedItems] = useState(InitSelectBtn(items.length, selected, multiselect));

    useEffect(()=> {
        if (onChange) {
            const selItems = [];
            selectedItems.map((e, i)=> {
                if (e) {
                    selItems.push(i)
                }
            })
            onChange(selectedItems, selItems)
        }
    }, [selectedItems])
    const onClickAction = (i) => {
        setSelectedItems(s=>{
            return (
                s.map((e, j)=> {
                    if (!multiselect) {
                        e = false;
                    }
                    if (i===j) {
                        return (!e);
                    } else {
                        return (e);
                    }
                })
            )
        })
    }

    const computedStyle = {
        gridTemplateColumns: "auto ".repeat(computeStyle(items.length)).trim()
    }
    // const itemStyle = Array(items.length).fill({width: "33%"})
    return (
        <div className="ih-select-btn" style={computedStyle}>
            {
                items.map((e, i)=>{
                    return (
                        // <div key={i} style={itemStyle[i]}
                        <div key={i}
                            // className="opt-wrapper"
                            className="opt"
                            onClick={()=>onClickAction(i)}
                            isselected={selectedItems[i] ? "true" : "false"}
                        >
                            {/* <div className="opt"> */}
                                {e}
                            {/* </div> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

const computeStyle = (n) => {
    const tmod = [4, 5];
    if (n < Math.min(...tmod)) {
        return n;
    }
    const mod = tmod.map(e=>n%e)
    let isZero=-1;
    let isMax=-1, curMax=0;
    for (let k = 0; k<n; k++) {
        if (mod[k] == 0) {
            isZero = k;
        } else {
            if (mod[k] >= curMax) {
                isMax = k;
                curMax = tmod[k]
            }
        }
    }
    if (isZero == -1) {
        return tmod[isMax]
    } else {
        return tmod[isZero]
    }
}

export default SelectBtn;
