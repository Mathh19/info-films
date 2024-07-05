import { useParams } from "react-router-dom";
import {
  getPersonCreditsData,
  getPersonData,
} from "../../services/get-person-data";
import { useQuery } from "@tanstack/react-query";
import { PersonInfo } from "../../components/person-info";
import { Biography } from "../../components/biography";
import { PersonPageSkeleton } from "../../components/UI/skeletons.tsx/person-page-skeleton";
import { CastAndCrewTable } from "../../components/table-cast-and-crew/cast-and-crew-table";

export const PersonMovie = () => {
  const { id } = useParams();
  const { data: personData, isPending: personPending } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getPersonData(id!),
  });
  const { data: creditsData, isPending: creditsPending } = useQuery({
    queryKey: ["movie", "credits", id],
    queryFn: () => getPersonCreditsData(id!),
  });

  const isPending = personPending || creditsPending;

  if (isPending) return <PersonPageSkeleton />;

  return (
    <div className="grid grid-cols-[1fr,2fr] gap-4 p-4 max-md:grid-cols-1">
      {personData && <PersonInfo person={personData} />}

      <div className="space-y-6">
        {personData && <Biography biography={personData.biography} />}
        {creditsData && (
          <CastAndCrewTable cast={creditsData.cast} crew={creditsData.crew} />
        )}
      </div>
    </div>
  );
};
