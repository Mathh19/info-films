import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-9 overflow-x-auto px-1.5 py-4">
      {React.Children.map(children, (child) => (
        <div key={crypto.randomUUID()} className="shrink-0">
          {child}
        </div>
      ))}
    </div>
  );
};
