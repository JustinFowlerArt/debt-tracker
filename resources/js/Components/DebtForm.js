import React, { useState } from "react";
import DebtTable from "./DebtTable";
import DebtInput from "./DebtInput";

export default function DebtForm() {
    const [debtData, setDebtData] = useState({
        id: 1,
        name: "",
        balance: "",
        payment: "",
        interest: "",
    });
    // const [debtInputData, setDebtInputData] = useState({
    //     name: "",
    //     balance: "",
    //     payment: "",
    //     interest: "",
    // });

    const handleChange = (e) => {
        const newInput = (data) => ({
            ...data,
            [e.target.name]: e.target.value,
        });
        setDebtData(newInput);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const checkEmptyInput = !Object.values(debtInputData).every(
    //         (res) => res === ""
    //     );
    //     if (checkEmptyInput) {
    //         const newData = (data) => [...data, debtInputData];
    //         setDebtData(newData);
    //         const emptyInput = {
    //             name: "",
    //             balance: "",
    //             payment: "",
    //             interest: "",
    //         };
    //         setDebtInputData(emptyInput);
    //     }
    // };

    // function handleClick() {
    //     setDebts([...debts, <Debt />]);
    // }

    return (
        <>
            <DebtTable data={debtData} handleChange={handleChange} />
            {/* <DebtInput
                debtData={debtData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            /> */}
            {/* <button onClick={handleClick}>Add Debt</button> */}
        </>
    );
}
