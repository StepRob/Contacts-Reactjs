import { Link, useRouteError } from "react-router-dom";


export const Errorpage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className=" flex flex-col items-center mt-48">
            <h1>Oops!</h1>
            <p>Disculpa, sucedió un error inesperado</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={`/`} className="bg-blue-500 rounded-md px-4 py-2 text-white mt-4">Regresar home</Link>
        </div>
    );
}
