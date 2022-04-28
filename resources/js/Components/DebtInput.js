import React from "react";
import blockInvalidChar from "@/Common/BlockInvalidChar";
import Input from "./Input";
import Label from "./Label";

export default function DebtInput({
    debtInputData,
    handleChange,
    handleSubmit,
}) {
    return (
        <form className="">
            <Label forInput="name" className="text-base">
                <Input
                    type="text"
                    name="name"
                    value={debtInputData.name}
                    className="p-1"
                    handleChange={handleChange}
                />
            </Label>
            <Label forInput="balance" className="text-base">
                <Input
                    type="number"
                    name="balance"
                    value={debtInputData.balance}
                    className="p-1 w-40"
                    handleChange={handleChange}
                    handleKeyDown={(e) => blockInvalidChar(e)}
                />
            </Label>
            <Label forInput="payment" className="text-base">
                <Input
                    type="number"
                    name="payment"
                    value={debtInputData.payment}
                    className="p-1 w-40"
                    handleChange={handleChange}
                    handleKeyDown={(e) => blockInvalidChar(e)}
                />
            </Label>
            <Label forInput="interest" className="text-base">
                <Input
                    type="number"
                    name="interest"
                    value={debtInputData.interest}
                    className="p-1 w-20"
                    handleChange={handleChange}
                    handleKeyDown={(e) => blockInvalidChar(e)}
                />
            </Label>
            <Label forInput="submit" className="text-base">
                <input
                    type="submit"
                    value="Submit"
                    className="ml-2 shadow-none"
                    onClick={handleSubmit}
                />
            </Label>
        </form>
    );
}
