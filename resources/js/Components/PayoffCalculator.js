import React, { useEffect, useState } from "react";
import PayoffForm from "./PayoffForm";

export default function Payoff({ debts }) {
    const [debtInterest, setDebtInterest] = useState(0)
    const [payoff, setPayoff] = useState({
        payment: 0,
        frequency: null,
    });

    useEffect(() => {
        let newInterest = 0
        debts.forEach((debt) => {
            if (debt.balance && debt.payment && debt.interest) {
                newInterest += compoundInterest(
                    debt.balance,
                    debt.balance / debt.payment / 12,
                    debt.interest / 100,
                    12
                )
            }
        });
        setDebtInterest(newInterest)
    }, [debts])

    console.log(debtInterest)
    
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
    let payoffTerm;
    let payoffUnit;
    if (payoffLengthYears < 2) {
        payoffTerm = Math.ceil(payoffLength);
        payoffUnit = "months";
    } else {
        payoffTerm = payoffLengthYears.toFixed(1);
        payoffUnit = "years";
    }

    function handleChange({ target }) {
        setPayoff({
            ...payoff,
            [target.name]: target.value,
        });
    }

    // // Compound interest calculations.
    // // p is the principal amount.
    // const principal = 2000;
    // // t is the time the money is invested or borrowed for.
    // const time = 5;
    // // r is the annual interest rate.
    // const rate = 0.08;
    // // n is the number of times that interest is compounded per unit t, for example if interest is compounded monthly and t is in years then the value of n would be 12.
    // // If interest is compounded quarterly and t is in years then the value of n would be 4.
    // const n = 12;
    function compoundInterest(p = 0, t = 1, r = 0, n = 12) {
        const amount = p * Math.pow(1 + r / n, n * t);
        const interest = amount - p;
        return interest;
    };
    // console.log(compoundInterest(principal, time, rate, n));

    // debts.forEach((debt) => {
    //     console.log(`
    //         Balance: ${debt.balance}
    //         Payment: ${debt.payment}
    //         Interest: ${debt.interest}

    //         Total Interest: ${compoundInterest(
    //             debt.balance,
    //             debt.balance / debt.payment / 12,
    //             debt.interest / 100,
    //             12
    //         )}
    // `);
    // });

    // console.log(`
    //     totalDebt: ${totalDebt}
    //     monthlyPayments: ${monthlyPayments}
    //     extraPayments: ${extraPayments}
    //     totalPayments: ${totalPayments}
    //     payoffLengthMonths ${payoffLength}
    //     payoffLengthYears ${payoffLengthYears}
    // `);

    return (
        <PayoffForm
            payoff={payoff}
            handleChange={handleChange}
            payoffTerm={payoffTerm}
            payoffUnit={payoffUnit}
            payoffLength={payoffLength}
            extraPayments={extraPayments}
        />
    );
}
