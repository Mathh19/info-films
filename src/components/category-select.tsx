import { Triangle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { Category } from "../shared-types/api-responses";
import { useUrlParams } from "../hooks/useUrlParams";
import { slugify } from "../utils/slugify";
import { useEffect, useRef, useState } from "react";

type CategorySelectProps = {
  media_type: "movie" | "tv";
  categories: Category[];
};

export const CategorySelect = ({
  categories,
  media_type,
}: CategorySelectProps) => {
  const { filterParams } = useUrlParams();
  const [open, setOpen] = useState(false);
  const openList = useRef<HTMLButtonElement>(null);
  const listItem = useRef<HTMLLIElement>(null);

  const handleOpenList = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target !== openList.current && e.target !== listItem.current) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-2">
      <button
        className="flex w-full items-center justify-between rounded bg-background-secondary px-2 py-1 font-semibold"
        ref={openList}
        onClick={handleOpenList}
      >
        <span>{media_type === "movie" ? "Filmes" : "Séries"}</span>

        <Triangle
          className={cn(
            "fill-white transition-all duration-300",
            !open && "rotate-180",
          )}
          size={10}
        />
      </button>

      {open && (
        <ul className="absolute z-[1] max-h-48 w-full overflow-x-auto rounded bg-background-secondary">
          {categories.map((category) => (
            <li
              key={category.id}
              ref={listItem}
              className="group relative flex cursor-pointer items-center justify-center rounded bg-background-secondary after:absolute after:size-0 after:rounded after:bg-background-secondary after:brightness-150 after:transition-all after:duration-300 after:content-[''] focus-within:after:size-full hover:after:size-full"
            >
              <Link
                to={{
                  pathname: `category/${media_type}/${slugify(category.name)}/${category.id}`,
                  search: filterParams(["q", "page"]),
                }}
                className="relative z-[1] w-full p-2 py-1 text-center"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
