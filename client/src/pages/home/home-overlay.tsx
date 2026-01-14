import { useState } from "react";

export function HomeOverLay() {
  const [isMainScreen, setIsMainScreen] = useState<boolean>(true);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 transition-transform duration-1000 ease-in-out ${
        !isMainScreen ? "-translate-y-full" : ""
      }`}
      onClick={() => setIsMainScreen(false)}
    >
      <div className="text-center">
        <h1 className="text-7xl font-black tracking-tighter text-white animate-pulse">
          E<span className="text-indigo-500">.</span>CARD
        </h1>
        <p className="mt-4 text-zinc-500 uppercase tracking-widest text-sm">
          Click to Enter Portal
        </p>
      </div>
    </div>
  );
}
