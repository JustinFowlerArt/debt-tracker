import React from "react";
import blockInvalidChar from "@/Components/Common/BlockInvalidChar";
import Input from "./Common/Input";
import Label from "./Common/Label";

export default function PayoffForm({
    payoff,
    payoffTerm,
    payoffUnit,
    handleChange,
    payoffLength,
}) {
    return (
        <div className="flex">
            <div className="mr-6">
                <Label forInput="payment" className="text-base">
                    Payment Amount: $
                    <Input
                        type="number"
                        name="payment"
                        className="p-0 ml-2"
                        value={payoff.payment}
                        handleChange={handleChange}
                        handleKeyDown={(e) => blockInvalidChar(e)}
                    />
                </Label>
            </div>
            <select
                className="py-0 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                value={payoff.frequency || ""}
                name="frequency"
                onChange={handleChange}
            >
                <option value="0">Select a Frequency</option>
                <option value="12">Monthly</option>
                <option value="26">Biweekly</option>
                <option value="52">Weekly</option>
            </select>
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
