import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h1>Rick and Morty Wiki</h1>
            <p>Here you can see information about all the characters that have appeared in Rick and Morty</p>
            <Link to='/characters'>Characters</Link>
            <Link to='/search'>Search</Link>
        </div>
    )
}
