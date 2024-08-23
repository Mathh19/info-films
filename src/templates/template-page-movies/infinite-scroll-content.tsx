import { useInfiniteQuery } from "@tanstack/react-query";
import { MovieAndTV } from "../../shared-types/media";
import { MovieCard } from "../../components/movie-card";
import { ContentSkeleton } from "../../components/UI/skeletons.tsx/content-skeleton";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import { Loading } from "../../components/UI/loading";
import { MoviesResponse } from "../../shared-types/api-responses";

type InfiniteScrollContentProps = {
  queryKey: any[];
  queryFn: (pageParam: number) => Promise<MoviesResponse<MovieAndTV[]>>;
};

export const InfiniteScrollContent = ({
  queryKey,
  queryFn,
}: InfiniteScrollContentProps) => {
  const { ref, inView } = useInView();

  const {
    data,
    hasNextPage,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [...queryKey, "infinite-scroll"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.results.length ? pages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="px-4 md:px-8">
      {status === "pending" ? (
        <ContentSkeleton />
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-3 place-items-center gap-6 max-md:grid-cols-2 max-xs:grid-cols-1">
            {data.pages.map((movies, i) => (
              <React.Fragment key={i}>
                {movies.results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    image={movie.poster_path}
                    title={"title" in movie ? movie.title : movie.name}
                    vote_average={movie.vote_average}
                    vote_count={movie.vote_count}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
        </>
      )}
    </div>
  );
};
