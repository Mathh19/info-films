import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-9 overflow-x-auto overflow-y-hidden px-1.5 py-4">
      {children}
    </div>
  );
};
