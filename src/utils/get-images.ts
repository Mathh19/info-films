import { MoviesResponse } from "../shared-types/api-responses";
import { Movie, TV } from "../shared-types/media";

export const getImages = (data: MoviesResponse<Movie[] | TV[]>) => {
  const images = data.results.map((movie: Movie | TV) => ({
    id: movie.id,
    title: "title" in movie ? movie.title : movie.name,
    backdrop_url: movie.backdrop_path,
    alt: `filme do ${"title" in movie ? movie.title : movie.name}`,
  }))
    .slice(0, 3)

  return images
}
