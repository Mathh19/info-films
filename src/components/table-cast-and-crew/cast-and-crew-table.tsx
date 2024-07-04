import { useState } from "react";
import { PersonCredits } from "../../shared-types/person";
import { CreditsTable } from "./components/credits-table";

type CastAndCrewTableProps = PersonCredits;

export const CastAndCrewTable = (person: CastAndCrewTableProps) => {
  const [castOrCrew, setCastOrCrew] = useState<"cast" | "crew">(() =>
    person.cast.length === 0 ? "crew" : "cast",
  );

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

      {castOrCrew === "cast" && <CreditsTable credits={person.cast} />}
      {castOrCrew === "crew" && <CreditsTable credits={person.crew} />}
    </div>
  );
};
