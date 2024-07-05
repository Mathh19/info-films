import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type NoInfoMessageProps = ComponentProps<"span">;

export const NoInfoMessage = ({ className, ...props }: NoInfoMessageProps) => {
  return (
    <span className={cn(className, "italic opacity-90")} {...props}>
      Sem informações.
    </span>
  );
};
