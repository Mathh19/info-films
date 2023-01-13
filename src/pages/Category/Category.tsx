import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';

const searchGenres = import.meta.env.VITE_DISCOVER;
const apiKey = import.meta.env.VITE_API_KEY;

const Category = () => {
  const [genresParams] = useSearchParams();
  const query = genresParams.get('q');
  const categoryValue = localStorage.getItem('category');

  const genresQueryUrl = `${searchGenres}?${apiKey}&with_genres=${query}&language=pt-BR`;

  return (
    <div>
      <MoviesContainer
        url={genresQueryUrl}
        query={query}
        title={`Filmes com a categoria: ${categoryValue}`}
      />
    </div>
  );
};

export default Category;
