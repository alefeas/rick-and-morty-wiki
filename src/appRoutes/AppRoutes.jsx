import { Route, Routes } from "react-router-dom"
import { CharactersList } from "../components/charactersList/CharactersList.jsx"
import { CharacterDetail } from "../components/charactersList/characterDetail/CharacterDetail.jsx"
import { NotFound } from "../components/notFound/NotFound.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/characters" element={<CharactersList/>}/>
            <Route path="/characters/:id" element={<CharacterDetail/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}
