import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type ModalContentProps = {
  children: React.ReactNode;
} & ComponentProps<"div">;

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      {children}
    </div>
  );
};
