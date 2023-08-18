import { Route, Routes } from "react-router-dom"
import { CharactersList } from "../components/charactersList/CharactersList.jsx"
import { LocationsList } from "../components/locationsList/LocationsList.jsx"
import { EpisodesList } from "../components/episodesList/EpisodesList.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/characters" element={<CharactersList/>}/>
            <Route path="/locations" element={<LocationsList/>}/>
            <Route path="/episodes" element={<EpisodesList/>}/>
        </Routes>
    )
}
