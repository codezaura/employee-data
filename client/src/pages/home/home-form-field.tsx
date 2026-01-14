import { Plus, UserPlus } from "lucide-react";
import { createEmployeeApi } from "../../api/api-services";
import { useState } from "react";
import { EmployeeBaseData } from "../../types/employee.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "../../api/keys";

export function FormField() {
  const queryClient = useQueryClient();

  const [newEmployeeData, setNewEmployeeData] = useState<EmployeeBaseData>({
    avatarUrl: "",
    experience: 0,
    gender: "Other",
    location: "",
    name: "",
    role: "",
  });

  const { mutate: handleCreate, isPending } = useMutation({
    mutationFn: (data: EmployeeBaseData) => createEmployeeApi(data),
    onSuccess: () => {
      // Refresh the list cache
      queryClient.invalidateQueries({ queryKey: [KEYS.ALL_EMPLOYEE] });

      setNewEmployeeData({
        avatarUrl: "",
        experience: 0,
        gender: "Other",
        location: "",
        name: "",
        role: "",
      });
    },
  });

  const onHandleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sticky top-6 bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-[1.5rem] backdrop-blur-xl shadow-2xl">
      {/* Header - More Compact */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
          <UserPlus size={18} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white leading-tight">
            New Profile
          </h3>
          <p className="text-[10px] text-zinc-500 font-medium">
            Quick Register
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Name & Role in a Grid to save height */}
        <div className="grid grid-cols-2 gap-3">
          <div className="group">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={newEmployeeData.name}
              placeholder="Full Name"
              className="w-full mt-1 bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:border-indigo-500/50 outline-none transition-all"
              onChange={onHandleChange}
            />
          </div>
          <div className="group">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Designation
            </label>
            <input
              type="text"
              name="role"
              value={newEmployeeData.role}
              placeholder="e.g. Lead"
              className="w-full mt-1 bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:border-indigo-500/50 outline-none transition-all"
              onChange={onHandleChange}
            />
          </div>
        </div>

        {/* Avatar URL */}
        <div className="group">
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
            Image URL
          </label>
          <textarea
            name="avatarUrl"
            value={newEmployeeData.avatarUrl}
            placeholder="https://..."
            className="w-full mt-1 bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 resize-none focus:border-indigo-500/50 outline-none transition-all"
            onChange={onHandleChange}
          />
        </div>

        {/* Experience & Location */}
        <div className="grid grid-cols-2 gap-3">
          <div className="group">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Exp (Yrs)
            </label>
            <input
              type="number"
              name="experience"
              value={newEmployeeData.experience}
              className="w-full mt-1 bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 outline-none transition-all"
              onChange={onHandleChange}
            />
          </div>
          <div className="group">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="City"
              value={newEmployeeData.location}
              className="w-full mt-1 bg-zinc-950/50 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 outline-none transition-all"
              onChange={onHandleChange}
            />
          </div>
        </div>

        {/* Gender Selection - Flattened */}
        <div>
          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1 block mb-1.5">
            Gender
          </label>
          <div className="flex p-1 bg-zinc-950/80 border border-zinc-800 rounded-xl">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  className="peer hidden"
                  onChange={onHandleChange}
                  checked={newEmployeeData.gender === g}
                />
                <div className="text-center py-1.5 text-[10px] font-bold rounded-lg peer-checked:bg-zinc-800 peer-checked:text-indigo-400 text-zinc-600 transition-all">
                  {g.toUpperCase()}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Compact Submit Button */}
        <button
          onClick={() => handleCreate(newEmployeeData)}
          disabled={[
            newEmployeeData.avatarUrl,
            newEmployeeData.experience,
            newEmployeeData.gender,
            newEmployeeData.name,
            newEmployeeData.role,
            newEmployeeData.location,
          ].includes("")}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-600/10"
        >
          {isPending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <Plus size={16} strokeWidth={3} />
              <span>Save Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
