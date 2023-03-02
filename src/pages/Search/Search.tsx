import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';
import { useFetch } from '../../hooks/useFetch';
import { DataProps } from '../../shared-types/data';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const searchQueryUrl = `${searchUrl}/movie?${apiKey}&query=${query}&language=pt-BR`;
  const { data } = useFetch<DataProps>(searchQueryUrl);

  return (
    <div>
      <MoviesContainer
        url={searchQueryUrl}
        title={
          data && data.total_results === 0
            ? `Não foi possível encontrar filmes com o nome ${query}`
            : `Resultados para: ${query}`
        }
      />
    </div>
  );
};

export default Search;
