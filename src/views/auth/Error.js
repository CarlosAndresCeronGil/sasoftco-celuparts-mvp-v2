import { Link } from 'react-router-dom';
import "./Error.scss";
import errorBg from '../../assets/images/background/error-bg.jpg';

const Error = () => {
  return (
    <>
      <div
        className="loginBox"
        style={{ background: `url(${errorBg}) no-repeat bottom center #fff` }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            {/* <h1 className='error-title'>404</h1> */}
            <div className="my-3">
              <h4>PAGINA NO ENCONTRADA!</h4>
              <span className="text-muted d-block fs-5">
              Parece que estás tratando de encontrar su camino a casa.{' '}
              </span>
            </div>

            <Link to="/" className="btn btn-danger">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
