import {useContext, createContext, useState} from "react"

export default function FavoriteListContext(){
    const [favoriteMovieList, setFavoriteMovieList] = useState([])
    const favoriteList = createContext();
}