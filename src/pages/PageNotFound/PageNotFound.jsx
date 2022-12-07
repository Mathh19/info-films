import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="container-error">
      <div className="page-error">
        <h1>Error 404</h1>
        <img
          src="./page_not_found.svg"
          alt="Uma imagem de error 404 para página não encontrada"
        />
        <p>Página não encontrada</p>
        <span>:(</span>
        <p>
          Você pode voltar para a página inicial clicando <a href="/">aqui</a>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
