import React, { useEffect, useState } from "react";
import PayoffForm from "./PayoffForm";
import { Debt } from "./DebtForm";
import PayoffTable from "./PayoffTable";

interface Props {
    debts: Array<Debt>;
}

export default function PayoffCalculator({ debts }: Props) {
    const [payoffLength, setPayoffLength] = useState(0);
    const [extraPayment, setExtraPayment] = useState({
        payment: 0,
        frequency: 1,
    });

    useEffect(() => {
        updatePayoff(0);
    }, [debts]);

    const payoffLengthYears = payoffLength / 12;

    // UI payoff length calculations.
    let payoffTerm: number;
    let payoffUnit: string;
    if (payoffLengthYears < 2) {
        payoffTerm = Math.ceil(payoffLength);
        payoffUnit = "months";
    } else {
        payoffTerm = Number(payoffLengthYears.toFixed(1));
        payoffUnit = "years";
    }

    function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        setExtraPayment({
            ...extraPayment,
            [target.name]: target.value,
        });
    }

    function updatePayoff(monthsUntilPayoff: number) {
        setPayoffLength(monthsUntilPayoff);
    }

    // TODO: Exclude 0 values from minDebt comparison
    let minDebt = debts.reduce((previousValue, currentValue) =>
        currentValue.balance < previousValue.balance
            ? currentValue
            : previousValue
    );

    function calculatePayoff(debt: Debt) {
        let interestCalc = 1 + debt.interestRate / 100 / 12;
        let debtBalance = debt.balance * interestCalc;
        let totalPaid = debt.payment;
        let finalPayment = 0;
        let monthsUntilPayoff = 1;
        let paymentMonth = 0;
        let extraPayments = 0;

        // TODO: Recalculate minDebt after debtBalance === 0
        if (debt === minDebt) {
            extraPayments = extraPayment.payment * extraPayment.frequency;
            totalPaid += extraPayments;
        }

        console.log(`Initial Balance: ${debtBalance}`);

        while (debtBalance >= 0.0001 && debtBalance <= 1000000) {
            debtBalance =
                (debtBalance - debt.payment - extraPayments) * interestCalc;
            monthsUntilPayoff++;
            paymentMonth++;
            if (debtBalance < debt.payment + extraPayments) {
                console.log(`Month ${paymentMonth} Balance: ${debtBalance}`);
                finalPayment = debtBalance;
                totalPaid += finalPayment;
                debtBalance = 0;
                console.log(`Final payment: ${finalPayment}`);
            } else {
                totalPaid += debt.payment + extraPayments;
                console.log(`Month ${paymentMonth}: ${debtBalance}`);
            }
        }

        if (totalPaid < debt.balance) {
            totalPaid = debt.balance
        }

        if (finalPayment < 0) {
            finalPayment = 0
            monthsUntilPayoff--
        }

        const interestPaid = totalPaid - debt.balance;

        // TODO: Fix call from rendering component error
        if (monthsUntilPayoff > payoffLength) {
            setPayoffLength(monthsUntilPayoff);
        }

        return {
            paymentMonth,
            monthsUntilPayoff,
            extraPayments,
            finalPayment,
            totalPaid,
            interestPaid,
        };
    }

    return (
        <>
            <PayoffForm
                extraPayment={extraPayment}
                handleChange={handleChange}
                payoffTerm={payoffTerm}
                payoffUnit={payoffUnit}
                payoffLength={payoffLength}
            />
            <PayoffTable debts={debts} calculatePayoff={calculatePayoff} />
        </>
    );
}
