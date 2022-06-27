import React, { useEffect, useState } from "react";
import PayoffForm from "./PayoffForm";
import { Debt } from "./DebtForm";

interface Props {
    debts: Array<Debt>;
    payoff: {
        payment: number;
        frequency: number;
    };
}

export default function PayoffTable({ debts, payoff }: Props) {
    return (
        <table className="table-auto w-full border-separate mt-4">
            <thead>
                <tr className="text-left">
                    <th>Debt</th>
                    <th>Payoff Length</th>
                    <th>Total Interest</th>
                    <th>Total Payments</th>
                    <th>Payment Schedule</th>
                </tr>
            </thead>

            <tbody>
                {debts?.map((debt) => {
                    if (debt.balance && debt.payment && debt.interestRate) {

                        let interestCalc = 1 + ((debt.interestRate / 100) / 12)
                        let debtBalance = debt.balance * interestCalc
                        let interestPaid = 0
                        let totalPaid = debt.payment;
                        let finalPayment = 0;
                        let monthsUntilPayoff = 1
                        let paymentMonth = 0

                        console.log(`Initial Balance: ${debtBalance}`)

                        while (debtBalance >= 0.0001) {
                            debtBalance = (debtBalance - debt.payment) * interestCalc
                            ++monthsUntilPayoff
                            ++paymentMonth
                            if (debtBalance < debt.payment) {
                                console.log(`Month ${paymentMonth} Balance: ${debtBalance}`)
                                finalPayment = debtBalance;
                                totalPaid += finalPayment
                                debtBalance = 0;
                                console.log(`Final payment: ${finalPayment}`)
                            } else {
                                totalPaid += debt.payment
                                console.log(`Month ${paymentMonth}: ${debtBalance}`)
                            }
                        }
                        interestPaid = totalPaid - debt.balance;

                        return (
                            <tr key={debt.id} className="my-1">
                                <td className="py-1">
                                    {debt.id}. {debt.name}
                                </td>
                                <td className="py-1">
                                    {monthsUntilPayoff} Months
                                </td>
                                <td className="py-1">
                                    <span className="p-1">$</span>
                                    {interestPaid.toFixed(2)}
                                </td>
                                <td className="py-1">
                                    <span className="p-1">$</span>
                                    {totalPaid.toFixed(2)}
                                </td>
                                <td className="py-1">Pay ${debt.payment} until month {paymentMonth} <br />
                                    Pay ${finalPayment.toFixed(2)} at month {monthsUntilPayoff} to pay off
                                </td>
                            </tr>
                        );
                    } else {
                        <></>
                    }
                })}
            </tbody>
        </table>
    );
}
