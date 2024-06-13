import { Crew } from "../../../shared-types/person";
import { Table } from "../../UI/table/table";
import { TableCell } from "../../UI/table/table-cell";
import { TableRow } from "../../UI/table/table-row";

type TableCrewProps = {
  crew: Crew[];
};

export const TableCrew = ({ crew }: TableCrewProps) => {
  return (
    <Table>
      <tbody>
        {crew.map((crew) => (
          <TableRow key={crypto.randomUUID()} className="border border-white">
            <TableCell>
              {crew.release_date === "" && "—"}
              {crew.first_air_date === "" && "—"}
              {crew.media_type === "movie"
                ? crew.release_date.slice(0, 4)
                : crew.first_air_date.slice(0, 4)}
            </TableCell>

            <TableCell>
              <a href={`/${crew.media_type}/${crew.id}`}>
                <span className="font-bold">
                  {crew.media_type === "movie" ? crew.title : crew.name}
                </span>
              </a>
            </TableCell>

            <TableCell>
              {crew.job ? (
                <div>
                  <span className="font-bold">Trabalho</span> - {crew.job}
                </div>
              ) : (
                <span className="italic">Sem informação</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};
