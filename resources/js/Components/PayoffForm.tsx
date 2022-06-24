import React from "react";
import blockInvalidChar from "./Common/BlockInvalidChar";
import Input from "./Common/Input";
import Label from "./Common/Label";
import SelectInput from "./Common/Select";

interface Props {
    payoff: {
        payment: number;
        frequency: number;
    };
    payoffTerm: number;
    payoffUnit: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    payoffLength: number;
}

export default function PayoffForm({
    payoff,
    payoffTerm,
    payoffUnit,
    handleChange,
    payoffLength,
}: Props) {
    return (
        <div className="flex">
            <div className="mr-6">
                <Label forInput="payment" className="text-base">
                    Extra Payment Amount: $
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
            <div className="mr-6">
                <Label forInput="payment" className="text-base">
                    <SelectInput
                        name="frequency"
                        value={payoff.frequency}
                        onChange={handleChange}
                        defaultOption={1}
                        options={[
                            { value: 1, text: "Monthly" },
                            { value: 1 / 12, text: "Annually" },
                        ]}
                    />
                </Label>
            </div>
            {payoffLength > 0 && isFinite(payoffLength) && (
                <div className="ml-6">
                    <p>
                        Payoff time: {payoffTerm} {payoffUnit}
                    </p>
                </div>
            )}
        </div>
    );
}