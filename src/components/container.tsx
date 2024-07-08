export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-9 overflow-x-auto py-4">{children}</div>;
};
