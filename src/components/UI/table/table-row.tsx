import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type TableRowProps = ComponentProps<"tr">;

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return <tr {...props} className={cn("border border-white", className)} />;
};
