import { Head } from '@inertiajs/react';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard — Orbit Desk" />
            <DashboardLayout activeNavId="dashboard" userName="Totok Michael">

                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center border-2 border-dashed border-gray-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome to Orbit Desk
                    </h2>
                    <p className="text-gray-500 max-w-md">
                        Your dashboard is currently empty. We will build and add components here one by one as required.
                    </p>
                </div>

            </DashboardLayout>
        </>
    );
}
