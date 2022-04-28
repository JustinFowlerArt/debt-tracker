import React, { useState } from "react";
import PayoffForm from "./PayoffForm";

export default function Payoff({ debts }) {
    const [payoff, setPayoff] = useState({
        payment: 0,
        frequency: null,
    });

    const totalDebt = debts.reduce(
        (_previousValue, _debt) => (_previousValue += _debt.balance),
        0
    );

    const payoffLength = totalDebt / (payoff.payment * payoff.frequency);
    const payoffLengthMonths = Math.ceil(payoffLength * 12);
    const payoffLengthWeeks = Math.ceil(payoffLength * 52);

    let payoffTerm;
    let payoffUnit;
    if (payoffLengthMonths > 24) {
        payoffTerm = payoffLength.toFixed(1);
        payoffUnit = "years";
    } else if (payoffLengthMonths < 2) {
        payoffTerm = payoffLengthWeeks;
        payoffUnit = "weeks";
    } else {
        payoffTerm = payoffLengthMonths;
        payoffUnit = "months";
    }

    function handleChange({ target }) {
        setPayoff({
            ...payoff,
            [target.name]: target.value,
        });
    }

    return (
        <PayoffForm
            payoff={payoff}
            handleChange={handleChange}
            payoffTerm={payoffTerm}
            payoffUnit={payoffUnit}
            payoffLength={payoffLength}
        />
    );
}
