import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import DebtForm from "@/Components/DebtForm";

export default function Dashboard(props) {
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
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="flex flex-col justify-between p-6 bg-white border-b border-gray-200">
                            <div>
                                <DebtForm />
                            </div>
                            {/* <div>
                                <Payoff debt={debt} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
