import { Debt } from "./DebtForm";
import localeOptions from "./Common/LocaleOptions";
import { useEffect } from "react";

interface Props {
    debts: Array<Debt>;
    calculatePayoff: (debt: Debt) => {
        paymentMonth: number;
        monthsUntilPayoff: number;
        extraPayments: number;
        finalPayment: number;
        totalPaid: number;
        interestPaid: number;
    };
}

export default function PayoffTable({ debts, calculatePayoff }: Props) {
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
                        const {
                            paymentMonth,
                            monthsUntilPayoff,
                            extraPayments,
                            finalPayment,
                            totalPaid,
                            interestPaid,
                        } = calculatePayoff(debt);

                        return (
                            <tr key={debt.id} className="my-1">
                                <td className="py-1">
                                    {debt.id}. {debt.name}
                                </td>
                                <td className="py-1">
                                    {monthsUntilPayoff}{" "}
                                    {monthsUntilPayoff > 1 ? (
                                        <>Months</>
                                    ) : (
                                        <>Month</>
                                    )}{" "}
                                    -{" "}
                                    <>
                                        {(monthsUntilPayoff / 12).toFixed(1)}{" "}
                                        Years
                                    </>
                                </td>
                                <td className="py-1">
                                    {interestPaid.toLocaleString(
                                        "en-US",
                                        localeOptions
                                    )}
                                </td>
                                <td className="py-1">
                                    {totalPaid.toLocaleString(
                                        "en-US",
                                        localeOptions
                                    )}
                                </td>
                                <td className="py-1">
                                    Pay{" "}
                                    {(debt.payment + extraPayments > totalPaid
                                        ? totalPaid
                                        : debt.payment + extraPayments
                                    ).toLocaleString(
                                        "en-US",
                                        localeOptions
                                    )}{" "}
                                    until month {paymentMonth} <br />
                                    {finalPayment > 0 && (
                                        <p>
                                            Pay{" "}
                                            {finalPayment.toLocaleString(
                                                "en-US",
                                                localeOptions
                                            )}{" "}
                                            at month {monthsUntilPayoff} to pay
                                            off
                                        </p>
                                    )}
                                </td>
                            </tr>
                        );
                    } else {
                        <></>;
                    }
                })}
            </tbody>
        </table>
    );
}
