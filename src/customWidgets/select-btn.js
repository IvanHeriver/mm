import React, {useState, useEffect} from "react";
import "./select-btn.css";

const InitSelectBtn = (n, selected, multiselect) => {
    const selectedItems = Array(n).fill(false);
    if (selected !== null) {
        if (!Array.isArray(selected)) {
            if (Number.isInteger(selected)) {
                selected = [selected]
            } else {
                throw "'selected' must be an integer of an array of integer"
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

const SelectBtn = ({items, onChange, selected=null, multiselect=false,
    class_container=null, class_item=null}) => {
  
    const [selectedItems, setSelectedItems] = useState(InitSelectBtn(items.length, selected, multiselect));

    useEffect(()=> {
        console.log("Has changed: " + selectedItems)
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

    // const computedStyle = {
    //     gridTemplateColumns: "auto ".repeat(computeStyle(items.length)).trim()
    // }
    // const style = {
    //     display: "flex",
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     justifyContent: "flex-start",
    //     alignContent: "center",
    // }
    return (
        <div className={"select-btn-container"+ (class_container ? " "+class_container : "")}>
            {
                items.map((e, i)=>{
                    return (
                        <button key={i}
                            onClick={()=>onClickAction(i)}
                            className={class_item}
                            isselected={selectedItems[i] ? "true" : "false"}
                        >
                            {e}
                        </button>
                    )
                })
            }
        </div>
    )
}

// const computeStyle = (n) => {
//     const tmod = [4, 5];
//     if (n < Math.min(...tmod)) {
//         return n;
//     }
//     const mod = tmod.map(e=>n%e)
//     let isZero=-1;
//     let isMax=-1, curMax=0;
//     for (let k = 0; k<n; k++) {
//         if (mod[k] == 0) {
//             isZero = k;
//         } else {
//             if (mod[k] >= curMax) {
//                 isMax = k;
//                 curMax = tmod[k]
//             }
//         }
//     }
//     if (isZero == -1) {
//         return tmod[isMax]
//     } else {
//         return tmod[isZero]
//     }
// }

export default SelectBtn;
