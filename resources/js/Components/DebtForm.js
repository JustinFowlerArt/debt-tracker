import React, { useState } from "react";
import DebtTable from "./DebtTable";
import Payoff from "./PayoffCalculator";

export default function DebtForm() {
    const [debts, setDebts] = useState([
        {
            id: 1,
            name: "",
            balance: 0,
            payment: 0,
            interest: 0,
        },
    ]);

    function handleChange(e, index) {
        const { name, value } = e.target;
        let input = value;
        if (name !== "name") {
            input = parseFloat(value);
        }
        const updatedDebt = [...debts];
        updatedDebt[index][name] = input;
        setDebts(updatedDebt);
    }

    const handleDelete = (i) => {
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

// const handleSubmit = (e) => {
//     e.preventDefault();
//     const checkEmptyInput = !Object.values(debtInputData).every(
//         (res) => res === ""
//     );
//     if (checkEmptyInput) {
//         const newData = (data) => [...data, debtInputData];
//         setDebts(newData);
//         const emptyInput = {
//             name: "",
//             balance: "",
//             payment: "",
//             interest: "",
//         };
//         setDebtInputData(emptyInput);
//     }
// };
