import { ArrowLeft } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link, useSearchParams } from "react-router-dom";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export const Header = ({ title, className, children }: HeaderProps) => {
  const [searchParams] = useSearchParams();

  const removeParam = () => {
    searchParams.delete("page");
    searchParams.delete("q");
    return searchParams.toString();
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <Link
        to={{ pathname: "/", search: removeParam() }}
        aria-label="voltar para página inicial"
        className="rounded-full p-1.5 transition-all hover:bg-background-secondary"
      >
        <ArrowLeft />
      </Link>
      <h2 className="text-4xl">{title}</h2>
      {children}
    </div>
  );
};
