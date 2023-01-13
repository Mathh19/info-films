import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const searchQueryUrl = `${searchUrl}/movie?${apiKey}&query=${query}&language=pt-BR`;

  return (
    <div>
      <MoviesContainer
        url={searchQueryUrl}
        title={`Resultados para: ${query}`}
      />
    </div>
  );
};

export default Search;
