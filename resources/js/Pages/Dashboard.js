import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

import Debt from "@/Components/Debt";
import Payoff from "@/Components/Payoff";

export default function Dashboard(props) {
    const [debt, setDebt] = useState(0);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between p-6 bg-white border-b border-gray-200">
                            <div>
                                Debt: $<span><Debt debt={debt} setDebt={setDebt}/></span>
                            </div>
                            {/* <div>
                                <Payoff debt={debt}/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
