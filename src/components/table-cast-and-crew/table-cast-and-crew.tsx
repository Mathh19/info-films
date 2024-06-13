import { useEffect, useState } from "react";
import { PersonCredits } from "../../shared-types/person";
import { TableCast } from "./components/table-cast";
import { TableCrew } from "./components/table-crew";

type TableCastAndCrewProps = PersonCredits;

export const TableCastAndCrew = (person: TableCastAndCrewProps) => {
  const [castOrCrew, setCastOrCrew] = useState<"cast" | "crew">("cast");

  useEffect(() => {
    if (person.cast.length === 0) return setCastOrCrew("crew");
    if (person.crew.length === 0) return setCastOrCrew("cast");
  }, []);

  return (
    <div>
      <div className="mb-4 flex gap-6">
        {person.cast.length > 0 && (
          <button
            data-active={castOrCrew === "cast"}
            onClick={() => setCastOrCrew("cast")}
            className="rounded px-2.5 py-1 text-2xl data-[active='true']:bg-cyan-400 data-[active='true']:font-semibold data-[active='true']:text-black max-[490px]:text-xl"
          >
            Atuação
          </button>
        )}
        {person.crew.length > 0 && (
          <button
            data-active={castOrCrew === "crew"}
            onClick={() => setCastOrCrew("crew")}
            className="rounded px-2.5 py-1 text-2xl data-[active='true']:bg-cyan-400 data-[active='true']:font-semibold data-[active='true']:text-black max-[490px]:text-xl"
          >
            Produção
          </button>
        )}
      </div>

      {castOrCrew === "cast" && <TableCast cast={person.cast} />}
      {castOrCrew === "crew" && <TableCrew crew={person.crew} />}
    </div>
  );
};
