import { Person, PersonCredits } from "../shared-types/person";
import { getAge } from "../utils/get-age";
import { getDateDeath } from "../utils/get-date-death";
const urlImg = import.meta.env.VITE_IMG;

type PersonInfoProps = {
  person: Person;
  credits?: PersonCredits;
};

export const PersonInfo = ({ person }: PersonInfoProps) => {
  const img = person.profile_path
    ? `${urlImg}/${person.profile_path}`
    : "/no-image-person.svg";
  const imgAlt = person.profile_path
    ? `Imagem da ${person.name}`
    : "Sem imagem";

  return (
    <div className="flex flex-col">
      <img src={img} alt={imgAlt} className="w-full rounded-lg" />

      <div className="mt-4 space-y-2">
        <div>
          <h3 className="text-xl font-bold">Nome</h3>
          <p>{person.name}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Nascimento</h3>
          {person.birthday ? (
            <p>
              {person.birthday}{" "}
              {!person.deathday && (
                <span>({getAge(person.birthday)} anos de idade)</span>
              )}
            </p>
          ) : (
            <span className="italic">Sem informações.</span>
          )}
        </div>
        {person.deathday && person.birthday && (
          <div>
            <h3 className="text-xl font-bold">Data de falecimento</h3>
            <p>
              {person.deathday} (idade:{" "}
              {getDateDeath(person.birthday, person.deathday)} anos)
            </p>
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold">Local de nascimento</h3>
          {!person.place_of_birth ? (
            <span className="italic">Sem informações.</span>
          ) : (
            <p>{person.place_of_birth}</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">Também conhecido(a) como</h3>
          <ul>
            {person.also_known_as.length === 0 ? (
              <span className="italic">Sem informações.</span>
            ) : (
              person.also_known_as.map((as) => (
                <li key={crypto.randomUUID()}>{as}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
