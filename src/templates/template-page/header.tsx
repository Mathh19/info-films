import { ArrowLeft } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import { useUrlParams } from "../../hooks/useUrlParams";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export const Header = ({ title, className, children }: HeaderProps) => {
  const { filterParams } = useUrlParams();

  return (
    <div className={cn("flex flex-wrap items-center gap-2 px-5", className)}>
      <Link
        to={{ pathname: "/", search: filterParams(["page", "q"]) }}
        aria-label="voltar para página inicial"
        className="rounded-full p-1.5 transition-all hover:bg-background-secondary"
      >
        <ArrowLeft />
      </Link>
      <h2 className="text-4xl">{title}</h2>

      <div>{children}</div>
    </div>
  );
};
