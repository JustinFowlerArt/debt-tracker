import React from "react";
import Input from "./Common/Input";
import blockInvalidChar from "@/Components/Common/BlockInvalidChar";

export default function DebtTable({ debts, handleChange, handleDelete }) {
    return (
        <table className="table-auto w-full border-separate">
            <thead>
                <tr className="text-left">
                    <th>&nbsp;</th>
                    <th>Debt Name</th>
                    <th>Remaining Balance</th>
                    <th>Monthly or Min. Payment</th>
                    <th>Interest Rate</th>
                </tr>
            </thead>

            <tbody>
                {debts?.map((debt, index) => {
                    return (
                        <tr key={index} className="my-1">
                            <td className="py-1">{debt.id}.</td>
                            <td className="py-1">
                                <Input
                                    type="text"
                                    name="name"
                                    value={debt.name}
                                    className="p-1"
                                    handleChange={(e) => handleChange(e, index)}
                                />
                            </td>
                            <td className="py-1">
                                <span className="p-1">$</span>
                                <Input
                                    type="number"
                                    name="balance"
                                    value={debt.balance}
                                    className="p-1 w-40"
                                    handleChange={(e) => {
                                        handleChange(e, index);
                                    }}
                                    handleKeyDown={(e) => blockInvalidChar(e)}
                                />
                            </td>
                            <td className="py-1">
                                <span className="p-1">$</span>
                                <Input
                                    type="number"
                                    name="payment"
                                    value={debt.payment}
                                    className="p-1 w-40"
                                    handleChange={(e) => handleChange(e, index)}
                                    handleKeyDown={(e) => blockInvalidChar(e)}
                                />
                            </td>
                            <td className="py-1">
                                <Input
                                    type="number"
                                    name="interest"
                                    value={debt.interest}
                                    className="p-1 w-20"
                                    handleChange={(e) => handleChange(e, index)}
                                    handleKeyDown={(e) => blockInvalidChar(e)}
                                />
                                <span>%</span>
                            </td>
                            <td className="py-1">
                                <button
                                    className="px-2 py-1 font-bold bg-red-300 rounded-md"
                                    onClick={() => handleDelete(index)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
