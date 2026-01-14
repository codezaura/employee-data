import { EmployeeCard } from "../../components/employee-card";
import { Employee } from "../../types/employee.types";

export function EmployeeList({ employeeList }: { employeeList: Employee[] }) {
  return (
    <div className="flex flex-col w-full">
      {/* Scrollable Container */}
      <div
        className="
          h-[calc(100vh-180px)] 
          overflow-y-auto 
          scrollbar-hide 
          hover:scrollbar-default 
          transition-all
        "
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 pb-10">
          {employeeList.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))}
        </div>

        {/* Subtle Fade at the bottom to indicate more content */}
        <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
