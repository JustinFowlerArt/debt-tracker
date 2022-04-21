import React, { useState } from "react";
import blockInvalidChar from "@/Common/BlockInvalidChar";
import Input from "./Input";
import Dropdown from "./Dropdown";

export default function Payoff( {debt} ) {
    const [payment, setPayment] = useState(0);
    const [frequency, setFrequency] = useState(null);

    function handleChange(event) {
        setPayment(event.target.value);
    }

    return (
        <div>
            <Input type="number" handleChange={handleChange}/>
            <Dropdown children="Test" />
            <Dropdown children={[
                <Dropdown.Content key={"Monthly"} children={"Monthly"}/>,
                <Dropdown.Content key={"Biweekly"} children={"Biweekly"}/>,
                <Dropdown.Content key={"Weekly"} children={"Weekly"}/>
                ]}
            />

            {/* <form>
                <input
                    className="p-0 bg-gray-200 border-b border-gray-500"
                    type="number"
                    onKeyDown={blockInvalidChar}
                    onChange={handleChange}
                />
                <select
                    onChange={onChange()}
                >
                <option value="Monthly">Monthly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Weekly">Weekly</option>

                </select>
            </form> */}
        </div>
    )
}