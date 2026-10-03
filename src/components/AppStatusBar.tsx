import React from 'react';
import { Wifi } from 'lucide-react';

interface AppStatusBarProps {
  time?: string;
}

export const AppStatusBar: React.FC<AppStatusBarProps> = ({ time = '9:41' }) => {
  return (
    <div className="relative z-30 flex md:hidden items-center justify-between px-2 pt-1 pb-2 text-white select-none">
      {/* Time */}
      <span className="text-[14px] font-semibold tracking-tight text-slate-100 font-mono">
        {time}
      </span>

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 text-slate-100">
        {/* Cellular 4 bars */}
        <div className="flex items-end gap-[1.5px] h-3">
          <div className="w-[3px] h-[3px] bg-slate-100 rounded-sm" />
          <div className="w-[3px] h-[5px] bg-slate-100 rounded-sm" />
          <div className="w-[3px] h-[7px] bg-slate-100 rounded-sm" />
          <div className="w-[3px] h-[9px] bg-slate-100 rounded-sm" />
        </div>

        {/* Wi-Fi Icon */}
        <Wifi className="w-3.5 h-3.5 stroke-[2.2] ml-0.5" />

        {/* Battery Capsule */}
        <div className="flex items-center ml-0.5">
          <div className="w-[21px] h-[10.5px] border-[1.2px] border-slate-200/90 rounded-[3.5px] p-[1px] flex items-center">
            <div className="h-full w-full bg-slate-100 rounded-[2px]" />
          </div>
          <div className="w-[1.2px] h-[4px] bg-slate-200/90 rounded-r-[1px] -ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
};
