export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between bg-white border-b border-zinc-900 p-4">
      {children}
    </header>
  );
};
