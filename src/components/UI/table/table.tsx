import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type TableProps = ComponentProps<"table">;

export const Table = ({ className, ...props }: TableProps) => {
  return <table {...props} className={cn("w-full", className)} />;
};
