import React, { useState } from "react";
import blockInvalidChar from "@/Common/BlockInvalidChar";
import Input from "./Input";
import Label from "./Label";

export default function Payoff({ debt }) {
    const [payment, setPayment] = useState(0);
    const [frequency, setFrequency] = useState(null);

    const payoffLength = debt / (payment * frequency);
    const payoffLengthMonths = Math.ceil(payoffLength * 12);
    const payoffLengthWeeks = Math.ceil(payoffLength * 52);

    let payoffTerm;
    let payoffUnit;
    if (payoffLengthMonths > 24) {
        payoffTerm = payoffLength.toFixed(1);
        payoffUnit = "years";
    } else if (payoffLengthMonths < 2) {
        payoffTerm = payoffLengthWeeks;
        payoffUnit = "weeks";

    } else {
        payoffTerm = payoffLengthMonths;
        payoffUnit = "months";
    }

    function handleChange(event) {
        setPayment(event.target.value);
    }

    function onChange(event) {
        setFrequency(event.target.value);
    }

    return (
        <div className="flex">
            <div className="mr-6">
                <Label forInput="payment" className="text-base">
                    Payment Amount: $
                    <Input
                        type="number"
                        name="payment"
                        className="p-0 ml-2"
                        handleChange={handleChange}
                        handleKeyDown={blockInvalidChar}
                    />
                </Label>
            </div>

            <form>
                <select
                    className="py-0 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    onChange={onChange}
                >
                    <option value="0">Select a Frequency</option>
                    <option value="12">Monthly</option>
                    <option value="26">Biweekly</option>
                    <option value="52">Weekly</option>
                </select>
            </form>
            {payoffLength > 0 && isFinite(payoffLength) && (
                <div className="ml-6">
                    <p>
                        Time until payoff: {payoffTerm} {payoffUnit}
                    </p>
                </div>
            )}
        </div>
    );
}
