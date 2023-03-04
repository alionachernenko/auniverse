import { Link } from "react-router-dom"
export const ErrorPage = () => {
    return (
        <div style={{
            height: '100vh', marginTop: 61, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <h1>404</h1>
            <p>Oops... page not found</p>
            <Link to='/auniverse' style={{
                color: 'black'}}>Back to homepage</Link>
        </div>
    )
}