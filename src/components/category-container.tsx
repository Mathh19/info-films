import { CategorySelect } from "./category-select";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesData } from "../services/get-categories-data";

export const CategoryContainer = () => {
  const { data: movieCategoriesData } = useQuery({
    queryKey: ["category", "movie"],
    queryFn: () => getCategoriesData("movie"),
  });
  const { data: tvCategoriesData } = useQuery({
    queryKey: ["category", "tv"],
    queryFn: () => getCategoriesData("tv"),
  });

  return (
    <div>
      <h3 className="my-2 text-lg">Categorias</h3>

      <div className="space-y-3">
        {movieCategoriesData && (
          <CategorySelect
            media_type="movie"
            categories={movieCategoriesData.genres}
          />
        )}
        {tvCategoriesData && (
          <CategorySelect
            media_type="tv"
            categories={tvCategoriesData.genres}
          />
        )}
      </div>
    </div>
  );
};
