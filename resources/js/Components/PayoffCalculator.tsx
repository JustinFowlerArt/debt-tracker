import React, { useEffect, useState } from "react";
import PayoffForm from "./PayoffForm";
import { Debt } from "./DebtForm";
import PayoffTable from "./PayoffTable"

interface Props {
    debts: Array<Debt>;
}

export default function PayoffCalculator({ debts }: Props) {
    const [debtInterest, setDebtInterest] = useState(0)
    const [payoff, setPayoff] = useState({
        payment: 0,
        frequency: 1,
    });

    useEffect(() => {
        let interest = 0;
        debts.forEach((debt) => {
            if (debt.balance && debt.payment && debt.interestRate) {
                interest += compoundInterest(
                    debt.balance,
                    debt.balance / (debt.payment + (payoff.payment * payoff.frequency)) / 12,
                    debt.interestRate / 100,
                    12
                );
            }
        });
        setDebtInterest(interest)
    }, [debts, payoff]);

    // Total debt payoff calculation
    const totalDebt = debts.reduce(
        (_totalDebt, _debt) => (_totalDebt += _debt.balance),
        0
    );

    const monthlyPayments = debts.reduce(
        (_monthlyPayments, _debt) => (_monthlyPayments += _debt.payment),
        0
    );

    const extraPayments = payoff.payment * payoff.frequency;
    const totalPayments = extraPayments + monthlyPayments;
    const payoffLength = (totalDebt + debtInterest) / totalPayments;

    const payoffLengthYears = payoffLength / 12;

    // UI payoff length calculations.
    let payoffTerm: number;
    let payoffUnit: string;
    if (payoffLengthYears < 2) {
        payoffTerm = Math.ceil(payoffLength);
        // payoffTerm = payoffLength;
        payoffUnit = "months";
    } else {
        payoffTerm = Number(payoffLengthYears.toFixed(1));
        payoffUnit = "years";
    }

    function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        setPayoff({
            ...payoff,
            [target.name]: target.value,
        });
    }

    // Compound interest calculations.
    // p is the principal amount ie principal = 2000.
    // t is the time the money is invested or borrowed for ie time = 5.
    // r is the annual interest rate ie rate = 0.08.
    // n is the number of times that interest is compounded per unit t.
    // - if interest is compounded monthly and t is in years then the value of n would be 12.
    // - If interest is compounded quarterly and t is in years then the value of n would be 4.
    function compoundInterest(p = 0, t = 1, r = 0, n = 12) {
        const amount = p * Math.pow(1 + r / n, n * t);
        const interest = amount - p;
        return interest;
    }

    console.log(`PayoffCalculator interest: ${debtInterest}`)
   
    return (
        <>
            <PayoffForm
                payoff={payoff}
                handleChange={handleChange}
                payoffTerm={payoffTerm}
                payoffUnit={payoffUnit}
                payoffLength={payoffLength}
            />
            <PayoffTable
                debts={debts}
                payoff={payoff}
            />
        </>
    );
}
