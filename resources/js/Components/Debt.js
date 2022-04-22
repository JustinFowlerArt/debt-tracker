import React, { useState } from "react";
import blockInvalidChar from "@/Common/BlockInvalidChar";
import Input from "./Input";

export default function Debt({ debt, setDebt }) {
    const [updateDebt, setUpdateDebt] = useState(true);

    function onSubmit(event) {
        event.preventDefault();
        return setUpdateDebt(!updateDebt);
    }

    function handleChange(event) {
        setDebt(event.target.value);
    }

    function showDebt() {
        const toggle = () => setUpdateDebt(!updateDebt);
        return <a onClick={toggle}>{debt}</a>;
    }

    if (!updateDebt) {
        return showDebt();
    } else {
        return (
            <form className="inline ml-2" onSubmit={onSubmit}>
                <Input
                    type="number"
                    className="p-0"
                    handleChange={handleChange}
                    onKeyDown={blockInvalidChar}
                />
                <Input
                    type="submit"
                    value="Submit"
                    className="ml-2 shadow-none"
                />
            </form>
        );
    }
}
