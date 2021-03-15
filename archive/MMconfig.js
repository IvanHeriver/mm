import React, {useState} from "react";

import "./MMconfig.css";
import ih_cross_o from "./img/ih_cross_o.svg"

import SelectBtn from "./customWidgets/select-btn";

const MMconfig = ({holes, colors, colorOptions}) => {
    const holes_opt = [
        3, 4, 5, 6, 7, 8, 9, 10
    ]
    const onChangeAction = (selected, items) => {
        console.log(selected)
        console.log(items)
        console.log(holes_opt.filter((e, i)=>{
            return (selected[i])
        }))
    }
    return (
        <div className="mm-config">
            <section>
                <label className="mm-section-lab">
                    Select the number of holes:
                </label>
                <SelectBtn 
                    items={
                        holes_opt
                    }
                    onChange={onChangeAction}
                    selected={[2, 3]}
                    multiselect={false}
                />
            </section>
        </div>
    )
}

export default MMconfig;