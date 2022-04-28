import React from "react";
import Input from "./Input";
import blockInvalidChar from "@/Common/BlockInvalidChar";

export default function DebtTable({ data, handleChange }) {
    return (
        <table className="table-auto w-full">
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
                {/* {debtData.map((data) => {
                    return ( */}
                <tr key={data.id}>
                    <td>{data.id}.</td>
                    <td>
                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="p-1"
                            handleChange={handleChange}
                        />
                    </td>

                    <td>
                        <Input
                            type="number"
                            name="balance"
                            value={data.balance}
                            className="p-1 w-40"
                            handleChange={handleChange}
                            handleKeyDown={(e) => blockInvalidChar(e)}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            name="payment"
                            value={data.payment}
                            className="p-1 w-40"
                            handleChange={handleChange}
                            handleKeyDown={(e) => blockInvalidChar(e)}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            name="interest"
                            value={data.interest}
                            className="p-1 w-20"
                            handleChange={handleChange}
                            handleKeyDown={(e) => blockInvalidChar(e)}
                        />
                    </td>
                </tr>
                {/* );
                })} */}
            </tbody>
        </table>
    );
}
