import { createContext, useState } from "react";

type SidebarContextProps = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export const SidebarContext = createContext({} as SidebarContextProps);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenSidebar = () => {
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpen: open, setIsOpen: handleOpenSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
