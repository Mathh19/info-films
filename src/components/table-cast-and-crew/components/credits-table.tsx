import { Table } from "../../UI/table/table";
import { TableCell } from "../../UI/table/table-cell";
import { TableRow } from "../../UI/table/table-row";

type CreditsTableProps = {
  credits: {
    id: number;
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "tv";
    title?: string;
    name?: string;
    character?: string;
    job?: string;
  }[];
};

export const CreditsTable = ({ credits }: CreditsTableProps) => {
  const getDateYear = (date?: string) => {
    return date ? date.slice(0, 4) : "";
  };

  return (
    <Table className="block overflow-x-auto">
      <tbody>
        {credits.map((credit) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell>
              {"release_date" in credit && getDateYear(credit.release_date)}
              {"first_air_date" in credit && getDateYear(credit.first_air_date)}
            </TableCell>

            <TableCell>
              <a href={`/${credit.media_type}/${credit.id}`}>
                <span className="font-bold">
                  {credit.media_type === "movie" ? credit.title : credit.name}
                </span>
              </a>
            </TableCell>

            {"character" in credit && (
              <TableCell>
                {credit.character ? (
                  <div>
                    <span className="font-bold">Personagem</span> -{" "}
                    {credit.character}
                  </div>
                ) : (
                  <span className="italic">Sem informação</span>
                )}
              </TableCell>
            )}

            {"job" in credit && (
              <TableCell>
                {credit.job ? (
                  <div>
                    <span className="font-bold">Trabalho</span> - {credit.job}
                  </div>
                ) : (
                  <span className="italic">Sem informação</span>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};
