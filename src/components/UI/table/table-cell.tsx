import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type TableCellProps = ComponentProps<"td">;

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return <td {...props} className={cn("p-2", className)} />;
};
