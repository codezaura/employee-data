import {
  Briefcase,
  Edit3,
  Image as ImageIcon,
  MapPin,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Employee, EmployeeId } from "../types/employee.types";
import { deleteEmployeeApi } from "../api/api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "../api/keys";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: (id: EmployeeId) => deleteEmployeeApi(id),
    onSuccess: () => {
      // Refresh the list cache
      queryClient.invalidateQueries({ queryKey: [KEYS.ALL_EMPLOYEE] });
    },
  });

  return (
    <div className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-4 hover:bg-zinc-800/60 hover:border-zinc-600 transition-all duration-300">
      {/* Action Buttons - Larger touch targets */}
      <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={() => navigate(`/employee/${employee._id}/edit`)}
          className="p-2 bg-zinc-950/90 text-zinc-400 cursor-pointer hover:text-indigo-400 rounded-xl border border-zinc-800 hover:border-indigo-500/50 transition-all"
        >
          <Edit3 size={16} />
        </button>
        <button
          onClick={() => handleDelete(employee._id)}
          className="p-2 bg-zinc-950/90 text-zinc-400 cursor-pointer hover:text-red-400 rounded-xl border border-zinc-800 hover:border-red-500/50 transition-all"
        >
          {isPending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>

      <div className="flex items-center gap-5">
        {/* Profile Image - Slightly larger for better visual balance */}
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-800 border border-zinc-700 relative shadow-inner">
          {employee.avatarUrl ? (
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
              <ImageIcon size={28} />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            {employee.role || "Specialist"}
          </span>

          <h4 className="text-lg font-bold text-white truncate leading-tight mt-0.5">
            <span className="text-zinc-500 font-medium mr-1.5 text-base">
              {employee.gender === "Male"
                ? "Mr."
                : employee.gender === "Female"
                ? "Ms."
                : ""}
            </span>
            {employee.name}
          </h4>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
              <MapPin size={14} className="text-indigo-500/80" />
              <span className="truncate">{employee.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
              <Briefcase size={14} className="text-indigo-500/80" />
              <span>{employee.experience} Years Exp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
