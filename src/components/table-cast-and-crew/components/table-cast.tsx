import { Cast } from "../../../shared-types/person";
import { Table } from "../../UI/table/table";
import { TableCell } from "../../UI/table/table-cell";
import { TableRow } from "../../UI/table/table-row";

type TableCastProps = {
  cast: Cast[];
};

export const TableCast = ({ cast }: TableCastProps) => {
  return (
    <Table className="block overflow-x-auto">
      <tbody>
        {cast.map((cast) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell>
              {cast.release_date === "" && "—"}
              {cast.first_air_date === "" && "—"}
              {cast.media_type === "movie"
                ? cast.release_date.slice(0, 4)
                : cast.first_air_date.slice(0, 4)}
            </TableCell>

            <TableCell>
              <a href={`/${cast.media_type}/${cast.id}`}>
                <span className="font-bold">
                  {cast.media_type === "movie" ? cast.title : cast.name}
                </span>
              </a>
            </TableCell>

            <TableCell>
              {cast.character ? (
                <div>
                  <span className="font-bold">Personagem</span> -{" "}
                  {cast.character}
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
