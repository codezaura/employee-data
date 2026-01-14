import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md">
      {/* Outer Glow Effect */}
      <div className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />

      <div className="relative flex flex-col items-center">
        {/* Spinner Icon */}
        <div className="relative">
          <Loader2
            className="w-12 h-12 text-indigo-500 animate-spin"
            strokeWidth={1.5}
          />
          {/* Static Ring for smoother look */}
          <div className="absolute inset-0 w-12 h-12 border-4 border-indigo-500/10 rounded-full" />
        </div>

        {/* Text Details */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Syncing Team Data
          </h2>
          <p className="text-xs text-zinc-500 font-medium mt-1 uppercase tracking-[0.2em]">
            Connecting to server...
          </p>
        </div>

        {/* Progress bar style decoration */}
        <div className="w-48 h-1 bg-zinc-800 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-indigo-500 w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );
}
