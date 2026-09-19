import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

import { getFavoriteMoviesDoc } from "../services/firestore.js"

const FavoriteMoviesContext = createContext();

export function useFavoriteMovies(){
    return useContext(FavoriteMoviesContext)
}

export function FavoriteMoviesProvider({children}){ 
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchFavoriteMovies() {
            if(currentUser){
                const favoriteMoviesArray = await getFavoriteMoviesDocs(currentUser.uid);
                setFavoriteMovies(favoriteMoviesArray);
            } else {
                setFavoriteMovies([])
            }
            fetchFavoriteMovies()
        } 
    }, [currentUser])

    function addFavoriteMovie(movie){
        const alreadyAdded = favoriteMovies.some((favoriteMovie) => favoriteMovie.id === movie.id)
        if(!alreadyAdded){
            setFavoriteMovies( current => [ ...current, movie ])
        }
    }

     function removeFavoriteMovie(movie){
        setFavoriteMovies((current) => current.filter((favoriteMovie) => favoriteMovie.id !== movie.id))
    }

    const favoriteMoviesData = {
        favoriteMovies, 
        addFavoriteMovie, 
        removeFavoriteMovie, 
    }

    return(
        <FavoriteMoviesContext.Provider value={favoriteMoviesData}>
            {children}
        </FavoriteMoviesContext.Provider >
    )
    
}