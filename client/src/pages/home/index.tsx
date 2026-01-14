import { FormField } from "./home-form-field";

import { EmployeeList } from "./home-employee-list";

import { useAllEmployee } from "../../api/hooks";
import { LoadingScreen } from "../../components/loading-screen";

export default function Page() {
  const { data: employeeList, isLoading, error } = useAllEmployee();

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error loading employees</div>;

  return (
    <div className="bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30">
      <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Employee Directory
            </h2>
            <p className="text-zinc-500 mt-1">
              Manage your team members and their professional profiles.
            </p>
          </div>
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-sm font-medium">
            Total Staff: {employeeList.length}
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* FORM SECTION (Sticky) */}
          <aside className="lg:col-span-4">
            <FormField />
          </aside>

          {/* GRID SECTION */}
          <main className="lg:col-span-8">
            <EmployeeList employeeList={employeeList} />
          </main>
        </div>
      </div>
    </div>
  );
}
