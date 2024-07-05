import { Container } from "../../components/container";
import { PersonCard } from "../../components/person-card";
import { Cast, Crew } from "../../shared-types/person";

export type CreditsProps = {
  cast: Cast[];
  crew: Crew[];
  mediaType: "movie" | "tv";
};

export const Credits = ({ cast, crew, mediaType }: CreditsProps) => {
  const hasCredits = cast.length > 0 || crew.length > 0;

  return (
    <>
      {hasCredits && (
        <div className="p-4">
          {cast.length > 0 && (
            <>
              <h3 className="my-4 text-4xl font-bold">Elenco</h3>
              <Container>
                {cast.map((person) => (
                  <PersonCard
                    key={crypto.randomUUID()}
                    id={person.id}
                    mediaType={mediaType}
                    img={person.profile_path}
                    name={person.name}
                    character={person.character}
                  />
                ))}
              </Container>
            </>
          )}

          {crew.length > 0 && (
            <>
              <h3 className="my-4 text-4xl font-bold">Equipe</h3>
              <Container>
                {crew.map((person) => (
                  <PersonCard
                    key={crypto.randomUUID()}
                    id={person.id}
                    mediaType={mediaType}
                    img={person.profile_path}
                    name={person.name}
                    job={person.job}
                  />
                ))}
              </Container>
            </>
          )}
        </div>
      )}
    </>
  );
};
