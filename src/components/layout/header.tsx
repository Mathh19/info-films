import { Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-border-color flex justify-end border-b p-4">
      <form className="outline-border-color flex w-full max-w-80 items-center gap-4 rounded-full bg-[#21242D] px-4 py-2 outline outline-0 focus-within:outline-1 hover:outline-1">
        <button>
          <Search />
        </button>

        <input
          type="search"
          placeholder="buscar filmes..."
          className="w-full bg-transparent text-lg outline-none"
        />
      </form>
    </header>
  );
};
