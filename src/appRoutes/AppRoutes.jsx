import { Route, Routes } from "react-router-dom"
import { CharactersList } from "../components/charactersList/CharactersList.jsx"
import { CharacterDetail } from "../components/charactersList/characterDetail/CharacterDetail.jsx"
import { NotFound } from "../components/notFound/NotFound.jsx"
import { Home } from "../components/home/Home.jsx"
import { Search } from "../components/search/Search.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/characters" element={<CharactersList/>}/>
            <Route path="/characters/:id" element={<CharacterDetail/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}
