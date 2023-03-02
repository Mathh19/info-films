import './Error.css';

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="container-error-message">
      <p>Ocorreu um erro: {message}</p>
    </div>
  );
};

export default Error;
