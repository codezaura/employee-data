import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, RefreshCw, UserPen } from "lucide-react";
import { EmployeeBaseData } from "../../types/employee.types";
import { updateEmployeeApi } from "../../api/api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "../../api/keys";
import { useEmployee } from "../../api/hooks";
import { LoadingScreen } from "../../components/loading-screen";

export default function Page() {
  const navigate = useNavigate();

  const { employeeId = "" } = useParams();

  const queryClient = useQueryClient();

  const { data: fetchedEmployee, isLoading } = useEmployee(employeeId);

  const [employeeData, setEmployeeData] = useState<EmployeeBaseData>({
    avatarUrl: "",
    name: "",
    role: "",
    gender: "Other",
    experience: 0,
    location: "",
  });

  const handleEmployeeData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EmployeeBaseData }) =>
      updateEmployeeApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYS.ALL_EMPLOYEE] });

      queryClient.invalidateQueries({ queryKey: [KEYS.EMPLOYEE, employeeId] });

      navigate("/", { replace: true });
    },
  });

  useEffect(() => {
    if (fetchedEmployee) {
      setEmployeeData(fetchedEmployee);
    }
  }, [fetchedEmployee]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <UserPen size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Edit Profile
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                Modify team member details
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Row 1: Name & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={employeeData.name}
                className="w-full mt-1.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3.5 text-sm text-zinc-200 focus:border-indigo-500/50 outline-none transition-all"
                onChange={handleEmployeeData}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Designation
              </label>
              <input
                type="text"
                name="role"
                value={employeeData.role || ""}
                className="w-full mt-1.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3.5 text-sm text-zinc-200 focus:border-indigo-500/50 outline-none transition-all"
                onChange={handleEmployeeData}
              />
            </div>
          </div>

          {/* Avatar URL */}
          <div className="group">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Profile Image URL
            </label>
            <textarea
              name="avatarUrl"
              value={employeeData.avatarUrl}
              className="w-full mt-1.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3.5 text-sm text-zinc-200 h-24 resize-none focus:border-indigo-500/50 outline-none transition-all"
              onChange={handleEmployeeData}
            />
          </div>

          {/* Row 2: Exp & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Years Exp.
              </label>
              <input
                type="number"
                name="experience"
                value={employeeData.experience}
                className="w-full mt-1.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3.5 text-sm text-zinc-200 focus:border-indigo-500/50 outline-none transition-all"
                onChange={handleEmployeeData}
              />
            </div>
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={employeeData.location}
                className="w-full mt-1.5 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3.5 text-sm text-zinc-200 focus:border-indigo-500/50 outline-none transition-all"
                onChange={handleEmployeeData}
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 block mb-3">
              Gender Identity
            </label>
            <div className="flex p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    className="peer hidden"
                    onChange={handleEmployeeData}
                    checked={employeeData.gender === g}
                  />
                  <div className="text-center py-2.5 text-xs font-bold rounded-xl peer-checked:bg-zinc-800 peer-checked:text-indigo-400 text-zinc-600 transition-all duration-200">
                    {g.toUpperCase()}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                handleUpdate({ id: employeeId, data: employeeData })
              }
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <RefreshCw size={18} />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
