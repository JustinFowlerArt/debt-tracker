import { isEmpty } from "lodash";
import React, { useState } from "react";
import DebtTable from "./DebtTable";
import Payoff from "./PayoffCalculator";

export interface Debt {
    id: number;
    name: string | number;
    balance: number;
    payment: number;
    interest: number;
}

export default function DebtForm() {
    const [debts, setDebts] = useState<Array<Debt>>([
        {
            id: 1,
            name: "",
            balance: 0,
            payment: 0,
            interest: 0,
        },
    ]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const { name, value } = e.target;
        let input: string | number = value;
        if (name !== "name" && !isEmpty(input)) {
            input = parseFloat(value);
        }
        const updatedDebt = [...debts];
        // @ts-ignore
        updatedDebt[index][name as keyof Debt] = input;
        setDebts(updatedDebt);
    }

    const handleDelete = (i: number) => {
        const list = [...debts];
        list.splice(i, 1);
        setDebts(list);
    };

    function handleAdd() {
        setDebts([
            ...debts,
            {
                id: debts.length + 1,
                name: "",
                balance: 0,
                payment: 0,
                interest: 0,
            },
        ]);
    }

    return (
        <>
            <DebtTable
                debts={debts}
                handleChange={handleChange}
                handleDelete={handleDelete}
            />
            <button
                className="self-center my-4 px-3 py-2 rounded-md bg-green-200"
                onClick={handleAdd}
            >
                Add Row
            </button>
            <Payoff debts={debts} />
        </>
    );
}
