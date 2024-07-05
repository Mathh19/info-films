import React from "react";
import { createPortal } from "react-dom";

type ModalRootProps = {
  isOpen: boolean;
  setOpen: () => void;
  children: React.ReactNode;
};

export const ModalRoot = ({ isOpen, setOpen, children }: ModalRootProps) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            onClick={setOpen}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-10"
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};
