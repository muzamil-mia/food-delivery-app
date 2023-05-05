import ErrorImage from "../images/404 Error.jpg"

import { useRouteError, Link } from "react-router-dom"   //import useRouteError for routing error

const Error = () => {
    //call useRouteError so we can access error data while routing

    const err = useRouteError();
    console.log(err)
    return (
        <div className="error-page">
            <img src={ErrorImage} alt="error image" />
            <h1>Oops! </h1> <h2>Something went wrong!!</h2>
            <h2>{err.status + " :  " + err.statusText}</h2>
            <h3 className="error-data">{err.data}</h3>
            <h3 className="error-back-home">
                <Link to="/">Back Home</Link>
            </h3>
        </div>
    )
}

export default Error;