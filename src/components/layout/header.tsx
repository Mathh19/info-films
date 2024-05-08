import { Menu, Search } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { SidebarContext } from "../../contexts/sidebar-context";
import { cleanInputSpaces } from "../../utils/clean-input-spaces";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Header = () => {
  const { setIsOpen } = useContext(SidebarContext);
  const navigate = useNavigate();
  const [mediaTypeParams] = useSearchParams();
  const mediaType = mediaTypeParams.get("media_type") ?? "movie";
  const [inputValue, setInputValue] = useState("");

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const cleanInputValue = cleanInputSpaces(inputValue);
    navigate(`/search?q=${cleanInputValue}&media_type=${mediaType}`);
    setInputValue("");
  };

  return (
    <header className="flex w-full items-center justify-end gap-4 border-b border-border-color p-4 max-sm:justify-between">
      <button
        onClick={setIsOpen}
        className="rounded bg-background-secondary px-1.5 py-1 sm:hidden"
      >
        <Menu />
      </button>

      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-80 items-center gap-4 rounded-full bg-background-secondary px-4 py-2 outline outline-0 outline-border-color focus-within:outline-1 hover:outline-1"
      >
        <button aria-label="Pesquisar filme">
          <Search />
        </button>

        <input
          type="search"
          value={inputValue}
          onChange={handleSearchInputChange}
          placeholder="buscar filmes..."
          className="w-full bg-transparent text-lg outline-none"
        />
      </form>
    </header>
  );
};
